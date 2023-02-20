
import { fromEvent, EOF } from "../../src/index.js";

Mocha.describe("fromEvent()", function () {
  Mocha.it("emits on events", async function () {
    const { port1, port2 } = new MessageChannel();
    const observable = fromEvent(port2, "message");
    port2.start();
    port1.postMessage(1);
    port1.postMessage(2);
    const reader = observable.getReader();
    let msg;
    msg = (await reader.read()).value;
    chai.expect(msg.data).to.equal(1);
    msg = (await reader.read()).value;
    chai.expect(msg.data).to.equal(2);
  });
});
