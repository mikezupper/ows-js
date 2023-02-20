
/**
 * Returns a `Transform` where all subsequent repetitions of the same item are
 * filtered out.
 *
 * @typeparam T Type of items emitted by the observable.
 * @param f Function to check if two items are the same.
 * By default strict equality is used.
 * @returns Transform that emits some items from the original observable.
 */
export function distinct(f){
  let last;
  let hasLast = false;
  return new TransformStream(
    {
      transform(chunk, controller) {
        if (!hasLast) {
          last = chunk;
          hasLast = true;
          controller.enqueue(chunk);
          return;
        }
        if (!f(chunk, last)) {
          controller.enqueue(chunk);
        }
        last = chunk;
      }
    },
    { highWaterMark: 1 },
    { highWaterMark: 0 }
  );
}
