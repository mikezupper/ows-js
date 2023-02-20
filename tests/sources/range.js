
import { range, collect } from "../../src/index.js";

Mocha.describe("range()", function () {
  Mocha.it("emits a series of integers", async function () {
    const list = await collect(range(-2, 2));
    chai.expect(list).to.deep.equal([-2, -1, 0, 1, 2]);
  });

  Mocha.it("can count backwards", async function () {
    const list = await collect(range(2, -2));
    chai.expect(list).to.deep.equal([2, 1, 0, -1, -2]);
  });
});
