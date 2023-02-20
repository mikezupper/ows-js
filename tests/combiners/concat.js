
import { external, EOF, concat, collect, range } from "../../src/index.js";
import { waitTicks } from "../utils.js";

Mocha.describe("concat()", function() {
  Mocha.it("concatenates multiple observables", async function() {
    const { observable, next } = external();
    const list = collect(concat(range(1, 3), observable, range(5, 7)));

    (async () => {
      await waitTicks();
      next(4);
      await waitTicks();
      next(EOF);
    })();

    chai.expect(await list).to.deep.equal([1, 2, 3, 4, 5, 6, 7]);
  });
});
