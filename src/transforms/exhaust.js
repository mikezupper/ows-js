
import { externalPromise } from "../utils.js";

/**
 * Converts a higher-order Observable into a first-order Observable by
 * dropping inner Observables while the previous inner Observable has
 * not yet completed.
 *
 * @returns Transform that emits items from the first observable until
 * it is exhausted, then continues with the next observable emitted.
 */
export function exhaust() {
  const lastInnerDone = externalPromise();
  let outerDone = false;
  const { readable, writable } = new TransformStream(undefined, { highWaterMark: 1 }, { highWaterMark: 0 });
  let currentReader;
  return {
    writable,
    readable: new ReadableStream(
      {
        async start(controller) {
          const reader = readable.getReader();
          while (true) {
            const { value, done } = await reader.read();
            if (done) {
              outerDone = true;
              if (currentReader) {
                await lastInnerDone.promise;
              }
              controller.close();
              return;
            }

            if (currentReader) {
              continue;
            }
            currentReader = value.getReader();
            (async () => {
              const readerCopy = currentReader;
              while (true) {
                const { value, done } = await readerCopy.read();
                if (done) {
                  if (outerDone) {
                    lastInnerDone.resolve();
                  }
                  currentReader = null;
                  return;
                }
                controller.enqueue(value);
              }
            })();
          }
        }
      },
      { highWaterMark: 0 }
    )
  };
}
