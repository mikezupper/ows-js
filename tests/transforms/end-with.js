
import { fromIterable, endWith, collect } from "../../src/index.js";

Mocha.describe("endWidth()", function() {
  Mocha.it("ends in the given items", async function() {
    const list = await collect(
      fromIterable([1, 2, 3]).pipeThrough(endWith(4, 5, 6))
    );

    chai.expect(list).to.deep.equal([1, 2, 3, 4, 5, 6]);
  });
});
