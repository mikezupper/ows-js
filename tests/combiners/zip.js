
import { fromIterable, zip, collect } from "../../src/index.js";

Mocha.describe("zip()", function() {
  Mocha.it("zips multiple observables", async function() {
    const list = await collect(
      zip(
        fromIterable([1, 2, 3, 4]),
        fromIterable(["one", "two", "three", "four"]),
        fromIterable(["eins", "zwei", "drei"])
      )
    );

    chai.expect(list).to.deep.equal([
      [1, "one", "eins"],
      [2, "two", "zwei"],
      [3, "three", "drei"]
    ]);
  });
});
