
import { collect, just, switchMap, range } from "../../src/index.js";

Mocha.describe("switch-all()", function () {
  Mocha.it("re-emit the first observable", async function () {
    const list = await collect(
      just(5).pipeThrough(switchMap(v => range(1, v)))
    );

    chai.expect(list).to.deep.equal([1, 2, 3, 4, 5]);
  });
});
