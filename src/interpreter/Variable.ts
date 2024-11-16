import _ from "lodash";
import { Evaluatable } from "../Evaluatable";
import { evaluateNode } from "../utils";
import { Context } from "../interface";

export class Variable extends Evaluatable {
  constructor(public readonly variableName: string) {
    super();
  }

  evaluateVariableName(variableName: string, context: Context) {
    if (_.isArray(variableName)) {
      // we can have nested variables
      return variableName.map((n) => evaluateNode(n, context));
    }

    return variableName;
  }

  evaluate(context: Context) {
    const variableName = this.evaluateVariableName(this.variableName, context);
    return _.get(context, variableName);
  }
}

export default Variable;
