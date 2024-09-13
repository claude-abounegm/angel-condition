import { Evaluatable } from "./Evaluatable";

export type GeneralNode<T = unknown> = Evaluatable | T;
export type Context = Record<string, any>;
