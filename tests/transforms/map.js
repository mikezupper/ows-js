
import { range, map, collect } from "../../src/index.js";

Mocha.describe("map()", function() {
  Mocha.it("maps each item", async function() {
    const list = await collect(range(1, 3).pipeThrough(map(async x => x + 1)));

    chai.expect(list).to.deep.equal([2, 3, 4]);
  });
});
