import {
  AutoTokenizer,
  PreTrainedTokenizer,
  type Message
} from '@huggingface/transformers';

export function safeParseJSON(text: string) {
  try {
    const obj = JSON.parse(text);
    return obj;
  } catch (e) {
    console.log(e);
    return null;
  }
}

/**
 * Helper to get around rate limits by chunking requrests that are sent concurrently
 */
export async function batcher<E = unknown, O = unknown>(
  items: E[],
  fn: (e: E) => Promise<O>,
  options?: { maxConcurrent?: number; delay?: number }
): Promise<O[]> {
  const { maxConcurrent = 8, delay = 100 } = options ?? {};

  const outputItems: O[] = [];

  for (let i = 0; i < items.length; i += maxConcurrent) {
    const sub = await Promise.all(items.slice(i, i + maxConcurrent).map(fn));
    outputItems.splice(outputItems.length, 0, ...sub);
    if (delay > 0) await new Promise((r) => setTimeout(() => r(true), delay));
  }

  return outputItems;
}

export interface GraniteMessage extends Message {
  role: 'user' | 'assistant' | 'system' | string;
}

class PipelineSingleton {
  static model = 'onnx-community/granite-3.0-2b-instruct';
  static instance: PreTrainedTokenizer;

  static async getInstance() {
    if (!this.instance) {
      this.instance = await AutoTokenizer.from_pretrained(this.model);
    }
    return this.instance;
  }
}

export async function buildPrompt(chat: GraniteMessage[]) {
  const tokenizer = await PipelineSingleton.getInstance();
  return tokenizer.apply_chat_template(chat, {
    add_generation_prompt: true,
    tokenize: false
  }) as string;
}
