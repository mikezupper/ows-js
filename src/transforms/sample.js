/**
 * Emits the most recently emitted value from the Observable whenever
 * the notifier emits. If no new value has been emitted from the
 * source observable since the last time the  notifier emitted, nothing
 * will be emitted.
 *
 * @param notifier Observable that triggers the sampling of the
 * source observable.
 * @returns Transform that emits whenever the notifier emits, provided
 * the source observable has emitted a new value in the mean time.
 */
export function sample(notifier) {
  let lastReceived;
  return new TransformStream(
    {
      start(controller) {
        (async () => {
          const reader = notifier.getReader();
          while (true) {
            const { done } = await reader.read();
            if (done) {
              return;
            }
            if (lastReceived.length === 0) {
              continue;
            }
            controller.enqueue(lastReceived.pop());
          }
        })();
      },
      transform(chunk, controller) {
        lastReceived[0] = chunk;
      }
    },
    { highWaterMark: 1 },
    { highWaterMark: 0 }
  );
}
