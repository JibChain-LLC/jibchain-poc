import { WatsonXAI } from '@ibm-cloud/watsonx-ai';
import { z } from 'zod';
import { RiskLevelEnum, ScenarioLevelEnum } from '#/enums';
import { safeParseJSON } from './shared';

const { WATSONX_AI_SERVICE_URL, WATSONX_AI_PROJECT_ID } = process.env;

interface GenerateBestPracticesOpts {
  summary: string;
}

const scenarioSchema = z.object({
  scenario: z.string(),
  mitigation_strategy: z.string(),
  confidence_level: z.number().gte(0).lte(1),
  implementation_time: z.number().int().positive(),
  cost: z.number().positive()
});

const planningSchema = z.record(
  z.nativeEnum(ScenarioLevelEnum),
  scenarioSchema
);

const bestPracticesSchema = z.object({
  best_practices: z.string(),
  justification: z.string(),
  risk_level: z.nativeEnum(RiskLevelEnum),
  financial_impact: z.number().int().positive(),
  scenario_planning: planningSchema
});

const PROMPT_TEMPLATE = `<|start_of_role|>system<|end_of_role|>
You are Granite, developed by IBM. You are a helpful AI assistant designed to help businesses mitigate possible risks that could arise based on news article summaries. You are to generate the following items:

1) \`best_practices\`: A paragraph of detailed best practices based on the article summary to help mitigate this possible risk.
2)  \`justification\`:  A paragraph as a detailed justification for why the best practices are applicable.
3) \`risk_level\`: Threat level that this possible risk poses to a company as \`hi\`, \`med\`, or \`low\`.
4) \`financial_impact\`: Number representing possible cost to a company the event in the article summary may cause as a dollar amount.
5) \`scenario_planning\`: detailed scenario planning for companies from news article summaries.

For \`scenario_planning\` you are to generate with these tiers in mind:

1) \`aspirational\`: This approach focuses on achieving optimal outcomes by leveraging best-case scenarios and proactive measures to maximize operational efficiency and resilience.
2) \`exploratory\`: Examines moderate-impact scenarios that balance potential challenges and opportunities, providing adaptable solutions to navigate uncertainties.
3) \`remediation\`: Prepares for worst-case scenarios by addressing severe disruptions and developing recovery strategies to mitigate long-term damage.

Each tier should contain these items:

1) \`scenario\`: A paragraph of a potential scenario that might arise from the article summary.
2) \`mitigation_strategy\`:  A paragraph with a strategy to mitigate the possible \`scenario\` from the perspective of some arbitrary company.
3) \`confidence_level\`: Confidence percentage as decimal of the success of the \`mitigation_strategy\`.
4) \`implementation_time\`: Number of months it would take to implement this \`mitigation_strategy\`.
5) \`cost\`: Number representing the potential cost of this scenario's \`mitigation_strategy\`.

- All output should strictly be in a json format, which only contains the keys and values asked for with no additional text.
- Do not generate random entities on your own and do not hallucinate.
- Do not give any explanations to your output.
- Only do what is asked to you. Do not generate any other text other than the fields asked for.
- You are to refer to the article summary as "the article" when needed.
- You are to refer to the business risk as "this risk" when needed.<|end_of_text|>
<|start_of_role|>documents<|end_of_role|>{summary_var}<|end_of_text|>
<|start_of_role|>user<|end_of_role|>Generate detailed best practices to mitigate this possible risk based on the supplied documents.<|end_of_text|>
<|start_of_role|>assistant<|end_of_role|>`.trim();

export default async function generateAllItems(
  opts: GenerateBestPracticesOpts
) {
  const { summary } = opts;

  try {
    const watsonx = WatsonXAI.newInstance({
      version: '2024-05-31',
      serviceUrl: WATSONX_AI_SERVICE_URL
    });

    const {
      status,
      result: { results }
    } = await watsonx.generateText({
      input: PROMPT_TEMPLATE.replace('{summary_var}', summary.trim()),
      modelId: 'ibm/granite-3-8b-instruct',
      projectId: WATSONX_AI_PROJECT_ID,
      parameters: {
        min_new_tokens: 0,
        max_new_tokens: 1500,
        decoding_method: 'greedy',
        stop_sequences: ['}\n  }\n}'],
        repetition_penalty: 1
      }
    });

    if (status !== 200 || results.length === 0)
      throw new Error('Bad response from watsonx API');

    const [{ generated_text }] = results;

    const jsonObject = safeParseJSON(generated_text);
    if (jsonObject === null)
      throw new Error(`Failed to parse json object from: ${generated_text}`);

    const { success, data, error } = bestPracticesSchema.safeParse(jsonObject);
    if (!success) throw new Error(error.message);

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
