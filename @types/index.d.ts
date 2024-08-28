import { Parser } from "nearley";
declare function createParser(): Parser;
/**
 * Parses the given expression and returns an
 * `Evaluatable` that can be evaluated with a context.
 *
 * This function is memoized for optimization.
 *
 * You can access the function's cache using `parse.cache`.
 */
export declare const parse: any;
/**
 * Evaluates the given expression using the context provided.
 *
 * @param {string} expression
 * @param {{ [key: string]: any }} [context]
 * @param {boolean} [strictBoolean] Whether to always return a boolean.
 * @returns {boolean}
 */
export declare function evaluate(expression: any, context?: {}, strictBoolean?: boolean): any;
declare const _default: {
    createParser: typeof createParser;
    _parse: (expression: any) => any;
    parse: any;
    evaluate: typeof evaluate;
};
export default _default;
