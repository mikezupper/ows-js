/**
 * Resolves with the last element emitted by the observable.
 * If no items are emitted the promise is rejected.
 *
 * @typeparam T Type of items emitted by the observable.
 * @param o Observable to extract from.
 * @returns Promise that resolves with a single item.
 */
export async function extractLast(o) {
  const reader = o.getReader();
  let latestValue;
  let hasLatestValue = false;
  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      break;
    }
    latestValue = value;
    hasLatestValue = true;
  }
  if (!hasLatestValue) {
    throw new Error("Observable finished without emitting any items");
  }
  return latestValue;
}
