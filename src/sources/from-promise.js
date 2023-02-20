
/**
 * Creates an observable from a promise, that emits exactly one value when
 * the promise resolves.
 *
 * @param p Promise that will be awaited.
 * @returns New observable that emits the value the promise settles with.
 */
export function fromPromise(p) {
  return new ReadableStream(
    {
      async start(controller) {
        controller.enqueue(await p);
        controller.close();
      }
    },
    { highWaterMark: 0 }
  );
}
