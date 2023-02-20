
export function externalPromise() {
  let resolve;
  const promise = new Promise(
    _resolve => (resolve = _resolve)
  );
  // @ts-ignore
  return { resolve, promise };
}
