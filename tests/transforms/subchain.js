
import { range, subchain, filter, map, collect } from "../../src/index.js";

Mocha.describe("subchain()", function () {
  Mocha.it("runs the subchain", async function () {
    const list = await collect(
      range(1, 10).pipeThrough(
        subchain(o =>
          o.pipeThrough(filter(v => v % 2 == 0)).pipeThrough(map(v => v * 3))
        )
      )
    );

    chai.expect(list).to.deep.equal([6, 12, 18, 24, 30]);
  });
});
