
import { range, last, collect } from "../../src/index.js";

Mocha.describe("last()", function() {
  Mocha.it("returns the last item", async function() {
    const list = await collect(range(1, 4).pipeThrough(last()));

    chai.expect(list).to.deep.equal([4]);
  });
});
