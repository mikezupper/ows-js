
import { buffer, collect, external, EOF } from "../../src/index.js";

import { waitTicks } from "../utils.js";

Mocha.describe("buffer()", function() {
  Mocha.it("emits arrays whenever the notifier emits", async function() {
    const notifier = external();
    const { observable, next } = external();

    const listP = collect(observable.pipeThrough(buffer(notifier.observable)));

    notifier.next(null);
    await waitTicks();
    next(1);
    await waitTicks();
    next(2);
    await waitTicks();
    notifier.next(null);
    await waitTicks();
    next(3);
    await waitTicks();
    notifier.next(null);
    await waitTicks();
    next(4);
    await waitTicks();
    notifier.next(EOF);
    await waitTicks();

    chai.expect(await listP).to.deep.equal([[1, 2], [3], [4]]);
  });
});
