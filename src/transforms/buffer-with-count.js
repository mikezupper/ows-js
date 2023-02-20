
/**
 * Collects items from the original observable into buffers of size `count`.
 *
 * @typeparam T Type of items emitted by the observable.
 * @param count Max size for the buffers.
 * @returns Transform that emits arrays of items from the original observable.
 */
export function bufferWithCount(count) {
  let buffer;
  return new TransformStream(
    {
      async transform(chunk, controller) {
        buffer.push(chunk);
        if (buffer.length === count) {
          controller.enqueue(buffer);
          buffer = [];
        }
      },
      flush(controller) {
        if (buffer.length > 0) {
          controller.enqueue(buffer);
        }
      }
    },
    { highWaterMark: 1 },
    { highWaterMark: 0 }
  );
}
