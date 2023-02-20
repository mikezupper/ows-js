
import { fromIterable, distinct, collect } from "../../src/index.js";

Mocha.describe("distinct()", function() {
  Mocha.it("discards sequences of equal items", async function() {
    const list = await collect(
      fromIterable([1, 1, 2, 1, 2, 2, 2, 2, 3]).pipeThrough(distinct())
    );

    chai.expect(list).to.deep.equal([1, 2, 1, 2, 3]);
  });
});
