
import { range, scan, collect } from "../../src/index.js";

Mocha.describe("scan()", function () {
  Mocha.it(
    "scans over an observable with a reducer function",
    async function () {
      const list = await collect(
        range(1, 5).pipeThrough(scan((a, b) => a + b, 0))
      );

      chai.expect(list).to.deep.equal([1, 3, 6, 10, 15]);
    }
  );
});
