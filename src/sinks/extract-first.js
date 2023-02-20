/**
 * Resolves with the first element emitted by the observable,
 * then releases the observable.
 * If no items are emitted the promise is rejected.
 *
 * @param o Observable to extract from.
 * @returns Promise that resolves with a single item.
 */
export async function extractFirst(o) {
  const reader = o.getReader();
  const { value, done } = await reader.read();
  if (done) {
    throw new Error("Observable finished without emitting any items");
  }
  reader.releaseLock();
  return value;
}
