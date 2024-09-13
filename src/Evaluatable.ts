export abstract class Evaluatable<
  TContext = Record<string, any>,
  TReturn = any
> {
  /**
   * Evaluates with the given context.
   */
  abstract evaluate(context: TContext): TReturn;
}
