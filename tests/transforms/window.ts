
import { window, collect, external, EOF } from "../../src/index.js";

import { waitTicks } from "../utils.js";

Mocha.describe("buffer()", function() {
  Mocha.it("emits arrays whenever the notifier emits", async function() {
    const notifier = external();
    const { observable, next } = external();

    const streamsP = collect(
      observable.pipeThrough(window(notifier.observable))
    );

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

    const list = await Promise.all((await streamsP).map(v => collect(v)));
    chai.expect(list).to.deep.equal([[1, 2], [3], [4]]);
  });
});
