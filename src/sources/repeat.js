
/**
 * Creates an observable that forever emits the same value.
 *
 * @returns New observable that emits the same value multiple times.
 */
export function repeat(v) {
  return new ReadableStream(
    {
      pull(controller) {
        controller.enqueue(v);
      }
    },
    { highWaterMark: 0 }
  );
}
