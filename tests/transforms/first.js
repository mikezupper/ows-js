
import { range, first, collect } from "../../src/index.js";

Mocha.describe("first()", function() {
  Mocha.it("returns the first item", async function() {
    const list = await collect(range(1, 4).pipeThrough(first()));

    chai.expect(list).to.deep.equal([1]);
  });
});
