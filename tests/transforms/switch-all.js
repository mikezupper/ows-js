
import {
  fromIterable,
  switchAll,
  collect,
  external,
  EOF
} from "../../src/index.js";

import { waitTicks } from "../utils.js";

function safeNext(o, v) {
  try {
    o.next(v);
  } catch (e) { }
}

Mocha.describe("switch-all()", function () {
  Mocha.it("re-emit the first observable", async function () {
    const list = await collect(
      fromIterable([fromIterable([1, 2, 3])]).pipeThrough(switchAll())
    );

    chai.expect(list).to.deep.equal([1, 2, 3]);
  });

  Mocha.it("switches to the most recent active observable", async function () {
    const o1 = external();
    const o2 = external();
    const outerO = external();

    const listP = collect(outerO.observable.pipeThrough(switchAll()));

    outerO.next(o1.observable);
    await waitTicks();
    safeNext(o1, 11);
    await waitTicks();
    safeNext(o1, 12);
    await waitTicks();
    outerO.next(o2.observable);
    await waitTicks();
    safeNext(o2, 21);
    await waitTicks();
    safeNext(o1, 13);
    await waitTicks();
    safeNext(o1, 14);
    await waitTicks();
    outerO.next(EOF);
    await waitTicks();
    safeNext(o2, 22);
    await waitTicks();
    safeNext(o1, EOF);
    await waitTicks();
    safeNext(o2, 23);
    await waitTicks();
    safeNext(o2, EOF);
    await waitTicks();

    chai.expect(await listP).to.deep.equal([11, 12, 21, 22, 23]);
  });

  Mocha.it("handles closing streams correctly", async function () {
    const o1 = external();
    const o2 = external();
    const outerO = external();

    const listP = collect(outerO.observable.pipeThrough(switchAll()));

    outerO.next(o1.observable);
    await waitTicks();
    safeNext(o1, 11);
    await waitTicks();
    safeNext(o1, EOF);
    await waitTicks();
    outerO.next(o2.observable);
    outerO.next(EOF);
    await waitTicks();
    safeNext(o2, 21);
    await waitTicks();
    safeNext(o2, 22);
    await waitTicks();
    safeNext(o2, EOF);
    await waitTicks();

    chai.expect(await listP).to.deep.equal([11, 21, 22]);
  });
});
