
import { range, filter, collect } from "../../src/index.js";

Mocha.describe("filter()", function() {
  Mocha.it("removes items that don’t match the predicate", async function() {
    const list = await collect(
      range(1, 4).pipeThrough(filter(x => x % 2 === 0))
    );

    chai.expect(list).to.deep.equal([2, 4]);
  });
});
