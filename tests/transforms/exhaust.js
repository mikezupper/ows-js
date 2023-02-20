
import {
  fromIterable,
  exhaust,
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

Mocha.describe("exhaust()", function () {
  Mocha.it("re-emit the first observable", async function () {
    const list = await collect(
      fromIterable([fromIterable([1, 2, 3])]).pipeThrough(exhaust())
    );

    chai.expect(list).to.deep.equal([1, 2, 3]);
  });

  Mocha.it("exhausts an inner observable before switching", async function () {
    const o1 = external();
    const o2 = external();
    const o3 = external();
    const outerO = external();

    const listP = collect(outerO.observable.pipeThrough(exhaust()));

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
    safeNext(o2, 22);
    await waitTicks();
    safeNext(o1, EOF);
    await waitTicks();
    outerO.next(o3.observable);
    outerO.next(EOF);
    await waitTicks();
    safeNext(o2, 23);
    await waitTicks();
    safeNext(o2, EOF);
    await waitTicks();
    safeNext(o3, 31);
    await waitTicks();
    safeNext(o3, EOF);
    await waitTicks();

    chai.expect(await listP).to.deep.equal([11, 12, 13, 14, 31]);
  });
});
