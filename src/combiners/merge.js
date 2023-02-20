
/**
 * Merges multiple ReadableStream by emitting all items from all the ReadableStream.
 * Items are emitted in the order they appear.
 *
 * @param os ReadableStream to combine.
 * @returns ReadableStream that emits items from all ReadableStream.
 */
export function merge(...os) {
    return new ReadableStream(
        {
            async start(controller) {
                const forwarders = os.map(async o => {
                    const reader = o.getReader();
                    while (true) {
                        const { value, done } = await reader.read();
                        if (done) {
                            return;
                        }
                        controller.enqueue(value);
                    }
                });
                await Promise.all(forwarders);
                controller.close();
            }
        },
        { highWaterMark: 0 }
    );
}
