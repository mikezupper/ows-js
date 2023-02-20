
import { external, EOF } from "../../src/index.js";

Mocha.describe("external()", function() {
  Mocha.it("emits when next() is called", async function() {
    const { observable, next } = external();
    next(1);
    next(2);
    next(EOF);
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
