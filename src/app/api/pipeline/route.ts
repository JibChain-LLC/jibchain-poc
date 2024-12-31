import assert from 'assert';
import { inArray } from 'drizzle-orm';
import { EventRegistry, TopicPage, type ER } from 'eventregistry';
import { NextRequest } from 'next/server';
import { z } from 'zod';
import { db } from '#/db';
import { risks, scenarioPlanning } from '#/db/schema/risks';
import { ScenarioLevelEnum } from '#/enums';
import riskCategorizer from './_helpers/categorizer';
import generateAllItems from './_helpers/gen-all';
import PerformanceMarker from './_helpers/performance-marker';
import { batcher } from './_helpers/shared';
import summarizeText from './_helpers/summarizer';

const { NEWS_API_KEY, NEWS_API_TOPIC_URI } = process.env;

interface TopicGetArticleRes {
  articles: {
    page: number;
    pages: number;
    totalResults: number;
    results: ER.Article[];
  };
  topicPage: ER.TopicPage;
}

const bodySchema = z.object({
  dry: z.boolean().optional()
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { success, data } = bodySchema.safeParse(body);

  if (!success)
    return Response.json({ message: 'Invalid request body' }, { status: 400 });

  const { dry: isDryRun = false } = data;

  const er = new EventRegistry({
    apiKey: NEWS_API_KEY,
    allowUseOfArchive: false
  });

  const articleTimer = new PerformanceMarker();
  const summaryTimer = new PerformanceMarker();
  const categoryTimer = new PerformanceMarker();
  const generationTimer = new PerformanceMarker();

  try {
    const topic = new TopicPage(er);
    await topic.loadTopicPageFromER(NEWS_API_TOPIC_URI as string);

    // pull relevant articles through topic page
    console.log('GETTING ARTICLES');
    articleTimer.start();
    const articleList = (
      (await topic.getArticles({
        page: 1,
        count: 25
      })) as TopicGetArticleRes
    ).articles.results.filter((article) => article.body !== undefined);
    articleTimer.end();

    // filter articles that are already in DB
    console.log('CULLING PRE-EXISTING ARTICLES');
    const alreadyExisting = new Set(
      (
        await db
          .select({ url: risks.url })
          .from(risks)
          .where(
            inArray(
              risks.url,
              articleList.map((a) => a.url).filter((u) => u !== undefined)
            )
          )
      )
        .map(({ url }) => url)
        .filter((url) => url !== null)
    );

    const filteredArticleList = articleList.filter(
      (a) => !alreadyExisting.has(a.url ?? '')
    );

    console.log('ARTICLES PULLED', articleList.length);
    console.log('NEW ARTICLES', filteredArticleList.length);
    if (filteredArticleList.length === 0)
      return Response.json({
        total: 0,
        data: [],
        message: 'No new articles to process'
      });

    // summarize articles
    console.log('SUMMARIZING ARTICLES');
    summaryTimer.start();
    const summaries = await batcher(filteredArticleList, async (article) => {
      return summarizeText(article.body as string);
    });
    summaryTimer.end();

    // categorize summaries
    console.log('CATEGORIZING ARTICLES');
    categoryTimer.start();
    const categories = await riskCategorizer(summaries.map((s) => s ?? ''));
    categoryTimer.end();

    // generate best practices
    console.log('GENERATING BEST PRACTICES');
    generationTimer.start();
    const bestPractices = await batcher(summaries, async (summary) => {
      if (!summary) return null;
      return generateAllItems({ summary });
    });
    generationTimer.end();

    // collect all data for insertion
    console.log('COLLECTING RECORDS');
    const riskRecords: (typeof risks.$inferInsert)[] = [];
    filteredArticleList.forEach((article, idx) => {
      const { url, title, date, image, source } = article;

      if (!url || !summaries[idx] || !bestPractices[idx]) return;

      const summary = summaries[idx];
      const { justification, best_practices, financial_impact, risk_level } =
        bestPractices[idx];
      const [category, probability] = categories[idx];

      riskRecords.push({
        title: title,
        url: url,
        articleDate: new Date(date || Date.now()),
        image: image,
        source: source?.title,
        summary: summary,
        riskCategory: category,
        probability: Math.max(...probability),
        riskLevel: risk_level,
        finanicalImpact: financial_impact,
        mitigation: best_practices,
        justification: justification,
        modelUsed: 'ibm/granite-3-8b-instruct',
        verified: false
      });
    });

    if (isDryRun) {
      return Response.json({
        totals: {
          risks: riskRecords.length
        },
        items: riskRecords,
        performance: {
          sourcing: articleTimer.measure(),
          summarization: summaryTimer.measure() / summaries.length,
          categorization: categoryTimer.measure() / categories.length,
          generation: generationTimer.measure() / bestPractices.length
        }
      });
    }

    // insert into database
    const inserted = await db.transaction(async (tx) => {
      const insertedRisks = await tx
        .insert(risks)
        .values(riskRecords)
        .returning({ id: risks.id });

      assert(insertedRisks.length === bestPractices.length);

      const scenarioPlanningRecords: (typeof scenarioPlanning.$inferInsert)[] =
        insertedRisks.flatMap(({ id }, idx) => {
          const { scenario_planning } = bestPractices[idx]!;
          return Object.entries(scenario_planning).map(([level, data]) => ({
            riskId: id,
            level: level as ScenarioLevelEnum,
            confidence: data.confidence_level,
            cost: data.cost,
            implementationTime: data.implementation_time,
            scenario: data.scenario,
            strategy: data.mitigation_strategy
          }));
        });

      const insertedScenarios = await tx
        .insert(scenarioPlanning)
        .values(scenarioPlanningRecords)
        .returning({ id: scenarioPlanning.id });

      return {
        risks: insertedRisks.map((r) => r.id),
        scenarios: insertedScenarios.map((s) => s.id)
      };
    });

    return Response.json({
      totals: {
        risks: inserted.risks.length,
        scenarios: inserted.scenarios.length
      },
      inserted,
      performance: {
        sourcing: articleTimer.measure(),
        summarization: summaryTimer.measure() / summaries.length,
        categorization: categoryTimer.measure() / categories.length,
        generation: generationTimer.measure() / bestPractices.length
      }
    });
  } catch (err) {
    console.log(err);
    return Response.json({ message: 'Internal Error' }, { status: 500 });
  }
}
