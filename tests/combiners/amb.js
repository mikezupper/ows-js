
import { external, amb, collect, EOF } from "../../src/index.js";
import { waitTicks } from "../utils.js";

Mocha.describe("amb()", function() {
  Mocha.it(
    "emits items from the observable that emits first",
    async function() {
      const { observable: o1, next: n1 } = external();
      const { observable: o2, next: n2 } = external();
      const { observable: o3, next: n3 } = external();

      const list = collect(amb(o1, o2, o3));

      const steps = [
        () => n3(0),
        () => n1(EOF),
        () => n2(1),
        () => n2(10),
        () => n3(100),
        () => n3(EOF)
      ];

      for (const step of steps) {
        step();
        await waitTicks();
      }

      chai.expect(await list).to.deep.equal([0, 100]);
    }
  );
});
