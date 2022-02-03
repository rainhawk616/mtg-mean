import { QueryClause } from "./query-clause.model";

export class Query {
    nameAnd: string = '';
    nameOr: string = '';
    nameNot: string = '';
    textAnd: string = '';
    textOr: string = '';
    textNot: string = '';
    supertypesAnd: string[] = [];
    typesAnd: string[] = [];
    subtypesAnd: string[] = [];
    pageIndex: number = 0;
    pageSize: number = 20;

    supertypes:QueryClause<string>[] = [];
    types:QueryClause<string>[] = [];
    subtypes:QueryClause<string>[] = [];

}
