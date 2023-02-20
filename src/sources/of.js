
// import { external, EOF } from "./external.js";
import { just } from "./just.js";

/**
 * An alias for {@link just}.
 *
 * @typeparam T Type of the emitted value.
 * @param vs Values to emit.
 * @returns New observable that emits the given values before ending.
 */
export function of(...vs) {
  return just(...vs);
}
