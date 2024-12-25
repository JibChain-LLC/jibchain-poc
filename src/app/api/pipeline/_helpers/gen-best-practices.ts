import { WatsonXAI } from '@ibm-cloud/watsonx-ai';
import { z } from 'zod';

const { WATSONX_AI_SERVICE_URL, WATSONX_AI_PROJECT_ID } = process.env;

interface GenerateBestPracticesOpts {
  summary: string;
  category: string;
}

const bestPracticesSchema = z.object({
  best_practices: z.string(),
  justification: z.string()
});

const PROMPT_TEMPLATE = `
Below is an ARTICLE_SUMMARY that is a summarization of a news article. This summary has been categorized to be a possible BUSINESS_RISK. You are to generate the following items:

1) \`best_practices\`: A paragraph of best practices based on the ARTICLE_SUMMARY and BUSINESS_RISK to help mitigate this possible risk.
2)  \`justification\`:  A paragraph as a justification for why the best practices are applicable.

- All output should strictly be in a json format, which only contains the keys and values asked for with no additional text.
- Do not generate random entities on your own and do not hallucinate.
- Do not give any explanations to your output.
- Only do what is asked to you. Do not generate any other text other than the fields asked for.
- You are to refer to the ARTICLE_SUMMARY as "the article" when needed.
- You are to refer to the BUSINESS_RISK as "this risk" when needed.

ARTICLE_SUMMARY:
{summary_var}

BUSINESS_RISK:
{business_risk_var}

JSON_OBJECT:
`.trim();

export default async function generateBestPractices(
  opts: GenerateBestPracticesOpts
) {
  const { summary, category } = opts;

  const watsonx = WatsonXAI.newInstance({
    version: '2024-05-31',
    serviceUrl: WATSONX_AI_SERVICE_URL
  });

  const {
    status,
    result: { results }
  } = await watsonx.generateText({
    input: PROMPT_TEMPLATE.replace('{summary_var}', summary).replace(
      '{business_risk_var}',
      category
    ),
    modelId: 'ibm/granite-3-8b-instruct',
    projectId: WATSONX_AI_PROJECT_ID,
    moderations: {
      hap: {
        input: {
          enabled: true,
          threshold: 0.5,
          mask: {
            remove_entity_value: true
          }
        },
        output: {
          enabled: true,
          threshold: 0.5,
          mask: {
            remove_entity_value: true
          }
        }
      },
      pii: {
        input: {
          enabled: true,
          threshold: 0.5,
          mask: {
            remove_entity_value: true
          }
        },
        output: {
          enabled: true,
          threshold: 0.5,
          mask: {
            remove_entity_value: true
          }
        }
      }
    },
    parameters: {
      min_new_tokens: 0,
      max_new_tokens: 500,
      decoding_method: 'greedy',
      stop_sequences: ['}'],
      repetition_penalty: 1
    }
  });

  if (status !== 200) return { justification: null, best_practices: null };
  const [{ generated_text }] = results;

  const jsonObject = JSON.parse(generated_text);
  const { success, data } = bestPracticesSchema.safeParse(jsonObject);

  if (!success) {
    return { justification: null, best_practices: null };
  }

  return data;
}
