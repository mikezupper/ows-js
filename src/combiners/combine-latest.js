/**
 * Combines items from multiple observables.
 * The resulting observable emits array tuples whenever any of the given
 * observables emit, as long as every observable has emitted at least once.
 * The tuples contain the last emitted item from each observable.
 *
 * @param os Observables to combine.
 * @returns Observable that emits tuples of items.
 */
export function combineLatest(...os) {
  const NONE = Symbol();
  const latestValue = os.map(() => NONE);
  return new ReadableStream(
    {
      async start(controller) {
        const forwarders = os.map(async (o, idx) => {
          const reader = o.getReader();
          while (true) {
            const { value, done } = await reader.read();
            if (done) {
              return;
            }
            latestValue[idx] = value;
            if (!latestValue.includes(NONE)) {
              controller.enqueue([...(latestValue)]);
            }
          }
        });
        await Promise.all(forwarders);
        controller.close();
      }
    },
    { highWaterMark: 0 }
  );
}
