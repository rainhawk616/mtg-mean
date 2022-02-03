export interface QueryClause{
    operator: 'and' | 'or' | 'not';
    value: string | undefined;
}