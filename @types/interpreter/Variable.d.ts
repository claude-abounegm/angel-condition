import Evaluatable from "../Evaluatable";
declare class Variable extends Evaluatable {
    private variableName;
    constructor(name: any);
    evaluateVariableName(variableName: any, context: any): any;
    evaluate(context: any): any;
}
export default Variable;
