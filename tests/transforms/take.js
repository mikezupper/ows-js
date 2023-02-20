
import { range, take, collect } from "../../src/index.js";

Mocha.describe("take()", function () {
  Mocha.it("takes the n first items", async function () {
    const list = await collect(range(1, 4).pipeThrough(take(2)));

    chai.expect(list).to.deep.equal([1, 2]);
  });
});
