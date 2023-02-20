
/**
 * Returns a `Transform` that emits items from the original observable until
 * `f` returns false.
 *
 * @param f Function called with each emitted item. If it returns `true`, the
 * item is emitted. Otherwise the item is discarded and no more items are
 * emitted.
 * @returns Transform that emits some items from the original observable.
 */
export function takeWhile(f) {
  return new TransformStream(
    {
      transform(chunk, controller) {
        if (!f(chunk)) {
          return controller.terminate();
        }
        controller.enqueue(chunk);
      }
    },
    { highWaterMark: 1 },
    { highWaterMark: 0 }
  );
}
