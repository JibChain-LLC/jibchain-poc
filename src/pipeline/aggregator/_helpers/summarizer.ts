import 'server-only';

import { WatsonXAI } from '@ibm-cloud/watsonx-ai';
import { WatsonxAI } from '@langchain/community/llms/watsonx_ai';
import { Document } from '@langchain/core/documents';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { PromptTemplate } from '@langchain/core/prompts';
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';
import { buildPrompt, GraniteMessage } from './shared';

const { WATSONX_AI_APIKEY, WATSONX_AI_SERVICE_URL, WATSONX_AI_PROJECT_ID } =
  process.env;

/**
 * Helper to summarize via stuff method shorter text bodies
 *
 * @param text text to summarize
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function stuffSummarizer(text: string): Promise<string> {
  const prompt = PromptTemplate.fromTemplate(`
    You are a helpful assistant.

    <|start_of_role|>user<|end_of_role|>
    Summarize the following news article into a concise 4 sentence paragraph:
    {context}<|end_of_text|>
    <|start_of_role|>assistant<|end_of_role|>`);

  const model = new WatsonxAI({
    ibmCloudApiKey: WATSONX_AI_APIKEY,
    projectId: WATSONX_AI_PROJECT_ID,
    modelId: 'ibm/granite-3-8b-instruct',
    modelParameters: {
      max_new_tokens: 450,
      min_new_tokens: 20,
      stop_sequences: [],
      repitition_penalty: 1
    }
  });

  const chain = await createStuffDocumentsChain({
    llm: model,
    outputParser: new StringOutputParser(),
    prompt
  });

  const document = new Document({
    pageContent: text
  });

  const res = await chain.invoke({ context: [document] });
  return res;
}

async function simpleSummarizer(text: string): Promise<string | null> {
  const messages: GraniteMessage[] = [
    {
      role: 'system',
      content: 'You are a helpful assistant.'
    },
    {
      role: 'user',
      content: `Summarize the following news article into a concise 4 sentence paragraph:\n${text.trim()}`
    }
  ];

  try {
    const prompt = await buildPrompt(messages);
    const watsonx = WatsonXAI.newInstance({
      version: '2024-05-31',
      serviceUrl: WATSONX_AI_SERVICE_URL
    });

    const {
      status,
      result: { results }
    } = await watsonx.generateText({
      input: prompt,
      modelId: 'ibm/granite-3-8b-instruct',
      projectId: WATSONX_AI_PROJECT_ID,
      parameters: {
        min_new_tokens: 20,
        max_new_tokens: 450,
        decoding_method: 'greedy',
        stop_sequences: [],
        repetition_penalty: 1
      }
    });

    if (status !== 200 || results.length === 0)
      throw new Error('Bad response from watsonx API');

    return results[0].generated_text;
  } catch {
    return null;
  }
}

export default async function summarizeText(text: string) {
  return simpleSummarizer(text);
}
