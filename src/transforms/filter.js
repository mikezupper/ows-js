/**
 * Returns a `Transform` that emits all items for which `f` returns true.
 *
 * @typeparam T Type of items emitted by the observable.
 * @param f Function called with each emitted item. If it returns `true`, the
 * item is emitted. Otherwise the item is discarded.
 * @returns Transform that emits some items from the original observable.
 */
export function filter(f) {
  return new TransformStream(
    {
      transform(chunk, controller) {
        if (f(chunk)) {
          controller.enqueue(chunk);
        }
      }
    },
    { highWaterMark: 1 },
    { highWaterMark: 0 }
  );
}
