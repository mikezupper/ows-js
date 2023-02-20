
import { range, reduce } from "../../src/index.js";

Mocha.describe("reduce()", function() {
  Mocha.it("reduces over the items of an observable", async function() {
    const result = await reduce(range(1, 5), (a, b) => a + b, 0);

    chai.expect(result).to.deep.equal(15);
  });
});
