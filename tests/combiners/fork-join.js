
import { forkJoin, range, single } from "../../src/index.js";

Mocha.describe("forkJoin()", function() {
  Mocha.it("merges multiple observables", async function() {
    const o1 = range(1, 9);
    const o2 = range(11, 13);
    const o3 = range(21, 21);
    const list = await single(forkJoin(o1, o2, o3));

    chai.expect(list).to.deep.equal([9, 13, 21]);
  });
});
