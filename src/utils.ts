import { Evaluatable } from "./Evaluatable";
import { Context, GeneralNode } from "./interface";

export function evaluateNode(node: GeneralNode, context: Context) {
  if (node instanceof Evaluatable) {
    return node.evaluate(context);
  }

  return node;
}
