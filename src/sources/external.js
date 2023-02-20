
/**
 * Symbol indicating the end of a stream. Used with `external`.
 */
export const EOF = Symbol();

/**
 * Utility function to create new observables from external sources.
 * Returns an object with two values: the new observable, and a `next` function
 * which will emit a value to `observable` when called.
 * Calling `next` with `EOF` will indicate there are no more values to emit.
 *
 */
export function external() {
  let next;
  const observable = new ReadableStream(
    {
      async start(controller) {
        next = (v) => {
          if (v === EOF) {
            return controller.close();
          }
          controller.enqueue(v);
        };
      }
    },
    { highWaterMark: 0 }
  );
  return { observable, next: next };
}

