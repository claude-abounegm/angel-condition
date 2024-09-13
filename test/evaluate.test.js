import { evaluate } from "../dist/index.js";
import Evaluatable from "../dist/Evaluatable.js";
import ShouldNotBeReachedError from "./ShouldNotBeReachedError.js";

function evaluateAssert(expression, context, expected) {
  const evaluated = evaluate(expression, context);

  expect(evaluated).toBe(expected);
}

describe("Evaluatable", function () {
  it("should throw on evaluate()", function () {
    const ev = new Evaluatable();

    try {
      ev.evaluate();
      throw new ShouldNotBeReachedError();
    } catch (e) {
      if (e instanceof ShouldNotBeReachedError) {
        throw e;
      }
    }
  });
});

describe("evaluate()", function () {
  it("should work with nested variable parsing and matching", function () {
    evaluateAssert("foo.x !== y", { foo: { x: 5 }, y: 5 }, false);
  });

  it("should work with double quoted strings", function () {
    evaluateAssert('gender === "female"', { gender: "female" }, true);
  });

  it("should work with single quoted strings", function () {
    evaluateAssert("gender === 'female'", { gender: "female" }, true);
  });

  it("should work with constant on the left", function () {
    evaluateAssert("5 === potato", { potato: 5 }, true);
  });

  it("should work with relational equality and string comparisons", function () {
    evaluateAssert(
      "x <= 76 && (y > 5 || z === 'hello world')",
      {
        x: 76,
        y: 5,
        z: "hello world",
      },
      true
    );
  });

  it("should work with < relational equality", function () {
    evaluateAssert("x < 76", { x: 74 }, true);
  });

  it("should work with >= relational equality", function () {
    evaluateAssert("x >= 76 && x >= 76", { x: 76 }, true);
  });

  it("should work with unary not with equality", function () {
    evaluateAssert("!x || y", { x: true, y: 2 }, true);
  });

  it("should work with single item in (expression)", function () {
    evaluateAssert(
      "x === 4 && y === 4 || (z)",
      { x: 3, y: 5, z: "hello" },
      false
    );
  });

  it("should work with multiple items in (expression)", function () {
    evaluateAssert(
      "(x === 4 && y === 4) || z",
      { x: 3, y: 5, z: "hello" },
      true
    );
  });

  it("should work with grouping", function () {
    evaluateAssert(
      "(x === 4 && y === 4) || z",
      { x: 3, y: 5, z: false },
      false
    );
  });

  it("should work with float constants", function () {
    evaluateAssert("x === 5.6", { x: 5.6 }, true);
  });

  it("should return result for () not boolean", function () {
    evaluateAssert("(x || y) === 'world\\''", { x: false, y: "world'" }, true);
  });

  it("should parse floats with e^x", function () {
    evaluateAssert("float === 1.2e3", { float: 1.2e3 }, true);
  });

  it("should parse null", function () {
    evaluateAssert("x === null", { x: null }, true);
  });

  it("should work without any variables", function () {
    evaluateAssert("1 > 2", {}, false);
  });

  it("should work with array items", function () {
    evaluateAssert(
      "arr .1. wombat === -3",
      {
        arr: [{ wombat: 1 }, { wombat: -3 }],
      },
      true
    );

    evaluateAssert(
      "arr[1].wombat === 3",
      {
        arr: [{ wombat: 1 }, { wombat: 3 }],
      },
      true
    );
  });

  it("should work with object keys", function () {
    evaluateAssert(
      "obj['key-with spaces'] === 'world'",
      {
        obj: { ["key-with spaces"]: "world" },
      },
      true
    );
  });

  it("should work with expressions", function () {
    evaluateAssert(
      "obj[key1 || key2] === 'world'",
      {
        obj: { ["key-with spaces"]: "world" },
        key1: "",
        key2: "key-with spaces",
      },
      true
    );
  });

  it("should work with unary not", function () {
    evaluateAssert("!true", {}, false);
    evaluateAssert("!false", {}, true);
    evaluateAssert("!var", { var: false }, true);
  });

  it("should work with a single literal", function () {
    evaluateAssert("1", null, true);
  });

  it("should work with a null value for context", function () {
    evaluateAssert("x", { x: true }, true);
  });

  it("should throw a correct error message", function () {
    try {
      evaluateAssert("cf * 4", {});
      throw new ShouldNotBeReachedError();
    } catch (e) {
      expect(e.message).toContain("Syntax error");
    }
  });

  it("should not parse on empty string or non-string", function () {
    try {
      evaluateAssert();
      throw new ShouldNotBeReachedError();
    } catch (e) {}
  });

  // it("should work with expressions", function () {
  //   evaluateAssert(
  //     "`${x}` === 'world'",
  //     {
  //       x: "wor",
  //     },
  //     true
  //   );
  // });
});
