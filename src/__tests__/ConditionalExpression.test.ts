import { ConditionalExpression } from "../interpreter/ConditionalExpression";
import ShouldNotBeReachedError from "./ShouldNotBeReachedError";

describe("ConditionalExpression", function () {
  it("should throw on invalid op", function () {
    const cond = new ConditionalExpression("", "", "^^");

    try {
      cond.evaluate();
      throw new ShouldNotBeReachedError();
    } catch (e) {
      if (e instanceof ShouldNotBeReachedError) {
        throw e;
      }
    }
  });

  // it('should always return ')
});
