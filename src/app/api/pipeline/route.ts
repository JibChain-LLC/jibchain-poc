import { EventRegistry, TopicPage, type ER } from 'eventregistry';
import { merge } from 'lodash';
import { batcher } from './_helpers/batcher';
import riskCategorizer from './_helpers/categorizer';
import generateBestPractices from './_helpers/gen-best-practices';
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

export async function POST() {
  const er = new EventRegistry({
    apiKey: NEWS_API_KEY,
    allowUseOfArchive: false
  });

  try {
    const topic = new TopicPage(er);
    await topic.loadTopicPageFromER(NEWS_API_TOPIC_URI as string);

    // pull relevant articles through topic page
    console.log('GETTING ARTICLES');
    const {
      articles: { results: articleList }
    } = (await topic.getArticles({
      page: 1,
      count: 25
    })) as TopicGetArticleRes;

    console.log('ARTICLES PULLED', articleList.length);

    // summarize articles
    console.log('SUMMARIZING ARTICLES');
    const summaries = await batcher(articleList, async (e) => {
      const { body } = e;
      if (!body) return null;
      return summarizeText(body);
    });

    // categorize summaries
    console.log('CATEGORIZING ARTICLES');
    const categories = await riskCategorizer(
      summaries.map((s) => (s === null ? '' : s))
    );

    const mergedData = merge(
      articleList.map(({ url, title }) => ({ title, url })),
      summaries.map((s) => ({ summary: s })),
      categories.map(([c, p]) => ({ category: c, prob: Math.max(...p) }))
    );

    // generate text copy
    console.log('GENERATING BEST PRACTICES');
    const bestPractices = await batcher(mergedData, async (e) => {
      if (!('summary' in e))
        return { justification: null, best_practices: null };
      return generateBestPractices({
        summary: e.summary as string,
        category: e.category
      });
    });

    return Response.json(
      {
        data: merge(mergedData, bestPractices)
      },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return Response.json({ message: 'Internal Error' }, { status: 500 });
  }
}
