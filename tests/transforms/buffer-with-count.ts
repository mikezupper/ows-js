
import { range, bufferWithCount, collect } from "../../src/index.js";

Mocha.describe("bufferWithCount()", function() {
  Mocha.it("splits the stream into chunks", async function() {
    const list = await collect(range(1, 5).pipeThrough(bufferWithCount(2)));

    chai.expect(list).to.deep.equal([[1, 2], [3, 4], [5]]);
  });
});
