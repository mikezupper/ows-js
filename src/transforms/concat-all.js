
// import { externalPromise } from "../utils.js";

/**
 * Converts a higher-order Observable into a first-order Observable
 * by concatenating the inner Observables in order.
 *
 * @returns Transform that emits items from the inner observables.
 */
export function concatAll() {
  const { readable, writable } = new TransformStream(
    undefined,
    { highWaterMark: 1 },
    { highWaterMark: 0 }
  );
  return {
    writable: new WritableStream(
      {
        async write(o) {
          await o.pipeTo(writable, { preventClose: true });
        },
        close() {
          writable.getWriter().close();
        }
      },
      { highWaterMark: 1 }
    ),
    readable
  };
}
