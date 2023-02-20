
import { fromIterable, zipWith, collect } from "../../src/index.js";

Mocha.describe("zipWith()", function () {
  Mocha.it("combines 2 observables", async function () {
    const list = await collect(
      fromIterable([1, 2, 3]).pipeThrough(
        zipWith(fromIterable(["a", "b", "c", "d"]))
      )
    );

    chai.expect(list).to.deep.equal([
      [1, "a"],
      [2, "b"],
      [3, "c"]
    ]);
  });
});
