
import { merge } from "../combiners/merge.js";

/**
 * Merges another observable by emitting all items from both the original
 * observable and the `other` observable. Items are emitted in the order they
 * appear.
 *
 * @param other Other observable to merge with.
 * @returns Transform that emits items from both observables.
 */
export function mergeWith(other) {
  const { readable, writable } = new TransformStream(
    undefined,
    { highWaterMark: 1 },
    { highWaterMark: 0 }
  );
  return {
    writable,
    readable: merge(readable, other)
  };
}
