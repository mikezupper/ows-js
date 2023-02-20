
import { fromIterable, takeWhile, collect } from "../../src/index.js";

Mocha.describe("take()", function() {
  Mocha.it("takes the n first items", async function() {
    const list = await collect(
      fromIterable([1, 2, 1, 3, 1, 1]).pipeThrough(takeWhile(i => i < 3))
    );

    chai.expect(list).to.deep.equal([1, 2, 1]);
  });
});
