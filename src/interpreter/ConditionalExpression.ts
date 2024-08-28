import Evaluatable  from "./../Evaluatable";
import { evaluateNode } from "../utils";

export default class ConditionalExpression extends Evaluatable {
  private leftNode: any;
  private rightNode: any;
  private operator: any;

  constructor(leftNode, rightNode, operator) {
    super();

    this.leftNode = leftNode;
    this.rightNode = rightNode;
    this.operator = operator;
  }

  evaluate(context) {
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