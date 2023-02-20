
import { external, EOF, merge, collect } from "../../src/index.js";
import { waitTicks } from "../utils.js";

Mocha.describe("merge()", function () {
  Mocha.it("merges multiple observables", async function () {
    const { observable: o1, next: n1 } = external();
    const { observable: o2, next: n2 } = external();
    const { observable: o3, next: n3 } = external();
    const list = collect(merge(o1, o2, o3));

    const steps = [
      () => n1(0),
      () => n2(1),
      () => n3(2),
      () => n1(3),
      () => n1(4),
      () => n2(5),
      () => n1(6),
      () => n3(7),
      () => n3(EOF),
      () => n2(8),
      () => n2(EOF),
      () => n1(9),
      () => n1(EOF)
    ];

    for (const step of steps) {
      step();
      await waitTicks();
    }

    chai.expect(await list).to.deep.equal([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
});
