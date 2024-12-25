import 'server-only';

import { WatsonxAI } from '@langchain/community/llms/watsonx_ai';
import { Document } from '@langchain/core/documents';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { PromptTemplate } from '@langchain/core/prompts';
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';

const { WATSONX_AI_APIKEY, WATSONX_AI_PROJECT_ID } = process.env;

/**
 * Helper to summarize via stuff method shorter text bodies
 *
 * @param text text to summarize
 */
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

export default async function summarizeText(text: string): Promise<string> {
  return stuffSummarizer(text);
}
