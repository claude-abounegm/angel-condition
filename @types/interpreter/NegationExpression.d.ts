import Evaluatable from "../Evaluatable";
declare class NegationExpression extends Evaluatable {
    private node;
    constructor(node: any);
    evaluate(context: any): boolean;
}
export default NegationExpression;
