
/**
 * Calls a function for each item emitted by an observable without
 * waiting for the function to return to forward the item.
 * Exceptions thrown by the function will be caught and ignored.
 *
 * @typeparam T Type of items emitted by the observable.
 * @param f Function called with each emitted value.
 * @returns Transform that emits the same items as the original observable.
 */
export function forEach(f) {
  return new TransformStream(
    {
      async transform(chunk, controller) {
        controller.enqueue(chunk);
        try {
          await f(chunk);
        } catch (e) { }
      }
    },
    { highWaterMark: 1 },
    { highWaterMark: 0 }
  );
}
