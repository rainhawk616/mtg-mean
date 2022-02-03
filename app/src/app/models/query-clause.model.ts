export class QueryClause<T> {
    operator: 'and' | 'or' | 'not';
    value: T | undefined;

    constructor(value:T) {
        this.operator = 'and';
        this.value = value;
    }
}