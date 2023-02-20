
import { collect, fromAsyncFunction } from "../../src/index.js";

Mocha.describe("fromAsyncFunction()", function () {
  Mocha.it("creates observable", async function () {
    const observable = fromAsyncFunction(async () => {
      return 4;
    });
    const list = await collect(observable);
    chai.expect(list).to.deep.equal([4]);
  });
});
