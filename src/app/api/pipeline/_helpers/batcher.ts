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
