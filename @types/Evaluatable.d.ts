export default class Evaluatable {
    /**
     * Evaluates with the given context.
     *
     * @param {{ [key: string]: any }} [context]
     */
    evaluate(context: any): void;
}
