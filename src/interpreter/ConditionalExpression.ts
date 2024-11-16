import { Evaluatable } from "./../Evaluatable";
import { evaluateNode } from "../utils";
import { GeneralNode } from "../interface";

export class ConditionalExpression extends Evaluatable {
  constructor(
    protected readonly leftNode: GeneralNode,
    protected readonly rightNode: GeneralNode,
    protected readonly operator: string
  ) {
    super();
  }

  public evaluate(context?: any) {
    const left = evaluateNode(this.leftNode, context);
    const right = evaluateNode(this.rightNode, context);

    switch (this.operator) {
      // case "==":
      //   return left == right;

      // case "!=":
      //   return left != right;

      case "===":
        return left === right;

      case "!==":
        return left !== right;

      case "<=":
        return left <= right;

      case "<":
        return left < right;

      case ">=":
        return left >= right;

      case ">":
        return left > right;

      case "&&":
        return left && right;

      case "||":
        return left || right;
    }

    throw new Error(this.operator + " not implemented");
  }
}

export default ConditionalExpression;
