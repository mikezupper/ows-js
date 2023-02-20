
/**
 * Zips items from multiple observables.
 * The resulting observable emits items as array tuples.
 *
 * @param os Observables to combine.
 * @returns Observable that emits tuples of items.
 */
export function zip(...os) {
  return new ReadableStream(
    {
      async start(controller) {
        const readers = os.map(o => o.getReader());
        while (true) {
          const values = await Promise.all(readers.map(r => r.read()));
          if (values.some(({ done }) => done)) {
            break;
          }
          controller.enqueue(values.map(({ value }) => value));
        }
        readers.forEach(r => r.releaseLock());
        controller.close();
      }
    },
    { highWaterMark: 0 }
  );
}
