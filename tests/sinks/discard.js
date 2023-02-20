
import { fromIterable, discard } from "../../src/index.js";

Mocha.describe("discard()", function () {
  Mocha.it("calls a function for each value", async function () {
    const iterable = [1, 2, 3, 4];
    const result = [];
    await fromIterable(iterable).pipeTo(discard(v => result.push(v)));
    chai.expect(result).to.deep.equal(iterable);
  });
});
