import _ from "lodash";
import { Grammar, Parser } from "nearley";
import { Context } from "./interface";
import { Evaluatable } from "./Evaluatable";

const grammar = Grammar.fromCompiled(require("./grammar"));

export const createParser = () => {
  return new Parser(grammar);
};

/**
 * Parses the given expression and returns an
 * `Evaluatable` that can be evaluated with a context.
 */
export const parseNoMemoize = (expression: string): Evaluatable => {
  if (!_.isString(expression) || expression.length === 0) {
    throw new Error("expression needs to be a non-empty string");
  }

  const parser = createParser();

  try {
    parser.feed(expression);

    const [node] = parser.results;

    // if (!(node instanceof Evaluatable)) {
    //   throw new Error("Result needs to be an instance of Evaluatable");
    // }

    return node;
  } catch (e) {
    const segments = e.message.split(/\r?\n/g).slice(0, 4);

    segments[2] = segments[2].substring(1);
    segments[3] = segments[3].substring(1);

    throw new Error(segments.join("\n"));
  }
};

/**
 * Parses the given expression and returns an
 * `Evaluatable` that can be evaluated with a context.
 *
 * This function is memoized for optimization.
 *
 * You can access the function's cache using `parse.cache`.
 */
export const parse = _.memoize(parseNoMemoize);

/**
 * Evaluates the given expression using the context provided.
 *
 * @param expression The expression to evaluate.
 * @param context The context to use for evaluation.
 * @param strictBoolean Whether to always return a boolean.
 */
export const evaluate = (
  expression: string,
  context: Context = {},
  strictBoolean = true
): boolean => {
  const node = parse(expression);

  let value = node.evaluate(context);
  if (!_.isBoolean(value) && strictBoolean) {
    value = !!value;
  }

  return value;
};
