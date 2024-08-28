import Evaluatable from "./../Evaluatable";
export default class ConditionalExpression extends Evaluatable {
    private leftNode;
    private rightNode;
    private operator;
    constructor(leftNode: any, rightNode: any, operator: any);
    evaluate(context: any): any;
}
