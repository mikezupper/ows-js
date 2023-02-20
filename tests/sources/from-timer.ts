import { fromTimer, forEach, discard } from "../../src/index.js";
Mocha.describe("fromTimer()", function () {
  Mocha.it("emits null in the given interval", function (done) {
    const observable = fromTimer(10);
    let list = [];

    observable.pipeThrough(forEach((v) => list.push(v))).pipeTo(discard());
    setTimeout(() => {
      chai.expect(list).to.have.length(4);
      done();
    }, 50);
  });
});
