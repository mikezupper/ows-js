
import { combineLatest } from "../combiners/combine-latest.js";

/**
 * Combines items from the original observable with the other observables.
 * See {@link combineLatest}.
 *
 * @param others Other observables to combine with.
 * @returns Transform that emits tuples of items.
 */
export function combineLatestWith(
  ...others
) {
  const { readable, writable } = new TransformStream(
    undefined,
    { highWaterMark: 1 },
    { highWaterMark: 0 }
  );
  return { writable, readable: combineLatest(readable, ...others) };
}
