import { Evaluatable } from "../Evaluatable";
import { evaluateNode } from "../utils";

export class NegationExpression extends Evaluatable {
  constructor(protected node: any) {
    super();
  }

  evaluate(context: any) {
    return !evaluateNode(this.node, context);
  }
}

export default NegationExpression;
