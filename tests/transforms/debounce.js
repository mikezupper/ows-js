
import { external, debounce, collect, EOF } from "../../src/index.js";
import { waitMs } from "../utils.js";

Mocha.describe("debounce()", function() {
  Mocha.it("debounces an observable", async function() {
    const { observable, next } = external();

    const list = collect(observable.pipeThrough(debounce(9)));

    await next(0);
    await waitMs(5);
    await next(1);
    await waitMs(10);
    await next(2);
    await waitMs(1);
    await next(3);
    await waitMs(1);
    await next(4);
    await waitMs(1);
    await next(5);
    await waitMs(10);
    await next(6);
    await next(EOF);

    chai.expect(await list).to.deep.equal([1, 5, 6]);
  });
});
