/**
 * Resolves with the only element emitted by the observable.
 * If zero or more than one items are emitted, the promise is rejected.
 *
 * @param o Observable to extract from.
 * @returns Promise that resolves with a single item.
 */
export async function single(o) {
  const reader = o.getReader();
  const { value, done } = await reader.read();
  if (done) {
    throw new Error("Observable finished without emitting any items");
  }
  if (!(await reader.read()).done) {
    throw new Error("Observable emitted more than one item");
  }
  return value;
}
