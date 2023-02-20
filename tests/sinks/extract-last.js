
import { range, fromIterable, extractLast } from "../../src/index.js";

Mocha.describe("extractLast()", function() {
  Mocha.it("returns the last item", async function() {
    const item = await extractLast(range(1, 9));
    chai.expect(item).to.equal(9);
  });

  Mocha.it("throws if no items are emitted", function(done) {
    extractLast(fromIterable([]))
      .then(() => done("extractLast() did not throw"))
      .catch(() => done());
  });
});
