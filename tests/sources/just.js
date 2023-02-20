
import { just, collect } from "../../src/index.js";

Mocha.describe("just()", function () {
  Mocha.it("emits just one item", async function () {
    const observable = just(1);
    const reader = observable.getReader();
    chai.expect(await reader.read()).to.deep.equal({
      value: 1,
      done: false
    });
    chai.expect(await reader.read()).to.deep.equal({
      value: undefined,
      done: true
    });
  });
  Mocha.it("emits a set of items", async function () {
    const list = await collect(just(1, 2, 3));

    chai.expect(list).to.deep.equal([1, 2, 3]);
  });
});
