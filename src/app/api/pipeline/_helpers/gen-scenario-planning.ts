import { WatsonXAI } from '@ibm-cloud/watsonx-ai';
import { z } from 'zod';

const { WATSONX_AI_SERVICE_URL, WATSONX_AI_PROJECT_ID } = process.env;

interface GenerateBestPracticesOpts {
  summary: string;
  category: string;
}

const bestPracticesSchema = z.object({
  scenario: z.string(),
  mitigation_strategy: z.string(),
  confidence_levl: z.number(),
  implementation_time: z.number(),
  cost: z.number()
});

const PROMPT_TEMPLATE = `
Below is an ARTICLE_SUMMARY that is a summarization of a news article. You are to generate the following items:

1) \`scenario\`: A paragraph of a potential scenario that might arise from the ARTICLE_SUMMARY.
2) \`mitigation_strategy\`:  A paragraph with a possible strategy to mitigate the possible \`scenario\`.
3) \`confidence_level\`: Confidence percentage of the success of the \`mitigation_strategy\` 
4) \`implementation_time\`: Number of months it would take to implement this \`mitigation_strategy\`.
5) \`cost\`: Number representing the potential cost of this scenario's \`mitigation_strategy\`.

- All output should strictly be in a json format, which only contains the keys and values asked for with no additional text.
- Do not generate random entities on your own and do not hallucinate.
- Do not give any explanations to your output.
- Only do what is asked to you. Do not generate any other text other than the fields asked for.
- You are to refer to the ARTICLE_SUMMARY as "the article" when needed.

ARTICLE_SUMMARY:
{summary_var}

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
