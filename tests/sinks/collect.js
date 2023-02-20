
import { fromIterable, collect } from "../../src/index.js";

Mocha.describe("collect()", function() {
  Mocha.it("returns all items with an array", async function() {
    const iterable = [1, 2, 3, 4];
    const collection = await collect(fromIterable(iterable));
    chai.expect(collection).to.deep.equal(iterable);
  });
});
