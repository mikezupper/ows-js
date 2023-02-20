
import { external, combineLatestWith, collect, EOF } from "../../src/index.js";
import { waitTicks } from "../utils.js";

Mocha.describe("combineLatestWith()", function () {
  Mocha.it("combines the latest values of 2 observables", async function () {
    const { observable: o1, next: n1 } = external();
    const { observable: o2, next: n2 } = external();

    const list = collect(o1.pipeThrough(combineLatestWith(o2)));

    const steps = [
      () => n1(0),
      () => n1(1),
      () => n2(0),
      () => n2(1),
      () => n2(2),
      () => n1(2),
      () => n1(3),
      () => n1(EOF),
      () => n2(3),
      () => n2(EOF)
    ];

    for (const step of steps) {
      step();
      await waitTicks();
    }

    chai.expect(await list).to.deep.equal([
      [1, 0],
      [1, 1],
      [1, 2],
      [2, 2],
      [3, 2],
      [3, 3]
    ]);
  });
});
