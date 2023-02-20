
/**
 * Collects items from the original observable into buffers until the
 * notifier emits. If no items have been buffered since the last time
 * the notifier emitted, nothing will be emitted. Closing the emitter
 * will emit the remaining buffer.
 *
 * @typeparam T Type of items emitted by the observable.
 * @param notifier Observable that emits when the buffer should be emitted.
 * @returns Transform that emits arrays of items from the original observable.
 */
export function buffer(notifier) {
  let buffer;
  return new TransformStream(
    {
      start(controller) {
        (async () => {
          const reader = notifier.getReader();
          while (true) {
            const { done } = await reader.read();
            if (buffer.length > 0) {
              controller.enqueue(buffer);
              buffer = [];
            }
            if (done) {
              controller.terminate();
              return;
            }
          }
        })();
      },
      transform(chunk) {
        buffer.push(chunk);
      }
    },
    { highWaterMark: 1 },
    { highWaterMark: 0 }
  );
}
