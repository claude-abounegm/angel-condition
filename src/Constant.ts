import { Evaluatable } from "./Evaluatable";

export class Constant extends Evaluatable {
  constructor(protected value: any) {
    super();
  }

  public evaluate(context: any) {
    return this.value;
  }
}
