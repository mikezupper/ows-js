
import { fromIterable, extractFirst } from "../../src/index.js";

Mocha.describe("extractFirst()", function() {
  Mocha.it("returns the first item", async function() {
    const item = await extractFirst(fromIterable([1, 2]));
    chai.expect(item).to.equal(1);
  });

  Mocha.it("throws if no items are emitted", function(done) {
    extractFirst(fromIterable([]))
      .then(() => done("first() did not throw"))
      .catch(() => done());
  });

  Mocha.it("can be used multiple times", async function() {
    const o = fromIterable([1, 2]);
    let item;
    item = await extractFirst(o);
    chai.expect(item).to.equal(1);
    item = await extractFirst(o);
    chai.expect(item).to.equal(2);
  });
});
