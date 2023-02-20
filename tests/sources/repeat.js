
import { repeat, range, zipWith, collect } from "../../src/index.js";

Mocha.describe("repeat()", function() {
  Mocha.it("repeats the same value infinitely", async function() {
    const list = await collect(repeat("hai").pipeThrough(zipWith(range(1, 3))));
    chai.expect(list).to.deep.equal([
      ["hai", 1],
      ["hai", 2],
      ["hai", 3]
    ]);
  });
});
