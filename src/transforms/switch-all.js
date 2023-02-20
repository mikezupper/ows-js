
import { externalPromise } from "../utils.js";

/**
 * Converts a higher-order Observable into a first-order Observable
 * producing values only from the most recent observable sequence.
 *
 * @returns Transform that emits items from the most recent observable
 * emitted by the outer observable.
 */
export function switchAll() {
  const lastInnerDone = externalPromise();
  let innerStreamCounter = 0;
  let outerDone = false;
  let currentReader;
  return new TransformStream(
    {
      transform(o, controller) {
        innerStreamCounter++;
        if (currentReader) {
          currentReader.cancel();
        }
        currentReader = o.getReader();
        (async () => {
          const readerCopy = currentReader;
          while (true) {
            try {
              const { value, done } = await readerCopy.read();
              if (done) {
                break;
              }
              controller.enqueue(value);
            } catch (e) {
              break;
            }
          }
          innerStreamCounter--;
          if (innerStreamCounter === 0) {
            currentReader = null;
          }
          if (outerDone) {
            lastInnerDone.resolve();
          }
        })();
      },
      async flush() {
        outerDone = true;
        if (currentReader) {
          await lastInnerDone.promise;
        }
      }
    },
    { highWaterMark: 1 },
    { highWaterMark: 0 }
  );
}
