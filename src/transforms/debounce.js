
/**
 * Returns a `Transform` where items are only emitted if `ms` milliseconds
 * pass without new a new emit by the source observable. If a new value is
 * emitted, the “cooldown” is restarted and the old value is discarded.
 *
 * @param ms Milliseconds to wait before emitting an item.
 * @returns Transform that emits some items from the original observable.
 */
export function debounce(ms) {
  let timeout;
  let timeoutP;
  let savedChunk;
  return new TransformStream(
    {
      transform(chunk, controller) {
        savedChunk = chunk;
        if (timeout > 0) {
          clearTimeout(timeout);
        }
        timeoutP = new Promise(resolve => {
          // @ts-ignore NodeJS types are interfering here
          timeout = setTimeout(() => {
            controller.enqueue(savedChunk);
            timeout = 0;
            resolve(undefined);
          }, ms);
        });
      },
      async flush() {
        await timeoutP;
      }
    },
    { highWaterMark: 1 },
    { highWaterMark: 0 }
  );
}
