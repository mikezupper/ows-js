
export async function waitTicks(n = 5) {
  for (let i = 0; i < n; i++) {
    await 0;
  }
}

let uid = 0;
const { port1, port2 } = new MessageChannel();
port2.start();
export function waitTask() {
  const localId = uid++;
  port1.postMessage(localId);
  return new Promise (resolve => {
    port2.addEventListener("message", function f(ev) {
      if (ev.data !== localId) {
        return;
      }
      port2.removeEventListener("message", f);
      resolve(null);
    });
  });
}

export function waitMs(ms = 5) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
