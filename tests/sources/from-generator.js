
import { fromGenerator } from "../../src/index.js";

Mocha.describe("fromGenerator()", function () {
  Mocha.it("works with generators", async function () {
    const observable = fromGenerator(function* () {
      yield 1;
      yield 2;
    });
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
