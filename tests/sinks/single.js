
import { fromIterable, single } from "../../src/index.js";

Mocha.describe("single()", function () {
  Mocha.it(
    "returns the the item when there is exactly one item",
    async function () {
      const item = await single(fromIterable([1]));
      chai.expect(item).to.equal(1);
    }
  );

  Mocha.it("throws if no items are emitted", function (done) {
    single(fromIterable([]))
      .then(() => done("single() did not throw"))
      .catch(() => done());
  });

  Mocha.it("throws if more than one item is emitted", function (done) {
    single(fromIterable([1, 2]))
      .then(() => done("single() did not throw"))
      .catch(() => done());
  });
});
