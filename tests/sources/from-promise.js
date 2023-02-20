
import { fromPromise, collect } from "../../src/index.js";

Mocha.describe("fromPromise()", function() {
  Mocha.it("creates observable", async function() {
    const observable = fromPromise(new Promise(resolve => resolve(4)));
    const list = await collect(observable);
    chai.expect(list).to.deep.equal([4]);
  });
});
