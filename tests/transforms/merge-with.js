
import { external, mergeWith, collect, EOF } from "../../src/index.js";
import { waitTicks } from "../utils.js";

Mocha.describe("mergeWith()", function () {
  Mocha.it("combines 2 observables", async function () {
    const { observable: o1, next: n1 } = external();
    const { observable: o2, next: n2 } = external();

    const list = collect(o1.pipeThrough(mergeWith(o2)));

    const steps = [
      () => n1(0),
      () => n1(1),
      () => n1(2),
      () => n2(3),
      () => n2(4),
      () => n2(5),
      () => n1(6),
      () => n1(7),
      () => n1(EOF),
      () => n2(8),
      () => n2(EOF)
    ];

    for (const step of steps) {
      step();
      await waitTicks();
    }

    chai.expect(await list).to.deep.equal([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  });
});
