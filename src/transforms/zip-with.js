import { zip } from "../combiners/zip.js";

/**
 * Zips items from the original observable with the `other` observable.
 * See {@link zip}.
 *
 * @param other Other observable to zip with.
 * @returns Transform that emits pairs of items.
 */
export function zipWith(other) {
  const { readable, writable } = new TransformStream(
    undefined,
    { highWaterMark: 1 },
    { highWaterMark: 0 }
  );

  return {
    writable,
    readable: zip(readable, other)
  };
}
