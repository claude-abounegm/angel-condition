import Evaluatable from "./Evaluatable";
declare class Constant extends Evaluatable {
    private value;
    constructor(value: any);
    evaluate(context: any): any;
}
export default Constant;
