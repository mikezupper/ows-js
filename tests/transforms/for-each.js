
import { fromIterable, forEach, collect, range } from "../../src/index.js";
import {  waitTask } from "../utils.js";

Mocha.describe("forEach()", function() {
  Mocha.it("executes for each item", async function() {
    const iterable = [1, 2, 3];
    let callCount = 0;
    const list = await collect(
      fromIterable(iterable).pipeThrough(
        forEach(x => {
          callCount++;
          return x + 1;
        })
      )
    );

    chai.expect(list).to.deep.equal(iterable);
    chai.expect(callCount).to.equal(iterable.length);
  });

  Mocha.it("waits until item has been processed", function(done) {
    let processing = false;
    collect(
      range(1, 4).pipeThrough(
        forEach(async v => {
          if (processing) {
            done("Next item got processed before previous was done");
          }
          processing = true;
          await waitTask();
          processing = false;
        })
      )
    ).then(list => {
      chai.expect(list).to.deep.equal([1, 2, 3, 4]);
      done();
    });
  });

  Mocha.it("does not fail when function throws", async function() {
    const list = await collect(
      range(1, 4).pipeThrough(
        forEach(x => {
          throw Error("LOL");
        })
      )
    );

    chai.expect(list).to.deep.equal([1, 2, 3, 4]);
  });
});
