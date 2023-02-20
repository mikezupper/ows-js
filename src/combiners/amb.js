/**
 * Takes in multiple observables but only emits items from the first observable
 * to emit.
 *
 * @param os Observables to race.
 * @returns Observable that emits items from one of the given observables.
 */
export function amb(...os) {
  return new ReadableStream(
    {
      async start(controller) {
        const readers = os.map(o => o.getReader());
        const reads = readers.map(async (r, i) => [await r.read(), i]);
        let [{ value, done }, i] = await Promise.race(reads);
        reads
          .filter((_, j) => j !== i)
          .map(async (r, j) => {
            await r;
            readers[j].releaseLock();
          });
        const [fastestObs] = readers.slice(i, i + 1);
        while (true) {
          if (done) {
            return controller.close();
          }
          controller.enqueue(value);
          ({ value, done } = await fastestObs.read());
        }
      }
    },
    { highWaterMark: 0 }
  );
}
