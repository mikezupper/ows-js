
import { fromIterable, concatAll, collect, just } from "../../src/index.js";

Mocha.describe("concatAll()", function() {
  Mocha.it("concatenates emitted observables", async function() {
    const list = await collect(
      fromIterable([
        fromIterable([1, 2, 3]),
        just(4),
        fromIterable([5, 6])
      ]).pipeThrough(concatAll())
    );

    chai.expect(list).to.deep.equal([1, 2, 3, 4, 5, 6]);
  });
});
