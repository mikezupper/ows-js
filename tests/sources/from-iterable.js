
import { fromIterable } from "../../src/index.js";

Mocha.describe("fromIterable()", function () {
  Mocha.it("emits all items", async function () {
    const observable = fromIterable([1, 2]);
    const reader = observable.getReader();
    chai.expect(await reader.read()).to.deep.equal({
      value: 1,
      done: false
    });
    chai.expect(await reader.read()).to.deep.equal({
      value: 2,
      done: false
    });
    chai.expect(await reader.read()).to.deep.equal({
      value: undefined,
      done: true
    });
  });
});
