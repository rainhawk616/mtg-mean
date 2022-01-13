export default class Query {
     nameAnd: string | undefined;
     nameOr: string | undefined;
     nameNot: string | undefined;
     textAnd: string | undefined;
     textOr: string | undefined;
     textNot: string | undefined;
     supertypesAnd: string[] = [];
     typesAnd: string[] = [];
     subtypesAnd: string[] = [];
     pageIndex: number = 0;
     pageSize: number = 20;

    constructor() {

    }

    public getNameTerms(): string[] {
        return Query.getTerms(this.nameAnd, this.nameOr);
    }

    public getTextTerms(): string[] {
        return Query.getTerms(this.textAnd, this.textOr);
    }

     static getTerms(str1: string | undefined, str2: string | undefined): string[] {
        const result: string[] = [];
        if (str1 !== undefined) {
            result.push(...str1.split(' '))
        }
        if (str2 !== undefined) {
            result.push(...str2.split(' '));
        }
        return result;
    }

    // public setNameAnd(value:string): Query {
    //     this.nameAnd = value;
    //     return this;
    // }

    // public setNameOr(value:string): Query {
    //     this.nameOr = value;
    //     return this;
    // }

    // public setNameNot(value:string): Query {
    //     this.nameNot = value;
    //     return this;
    // }

    // public setTextAnd(value:string): Query {
    //     this.textAnd = value;
    //     return this;
    // }

    // public setTextOr(value:string): Query {
    //     this.textOr = value;
    //     return this;
    // }

    // public setTextNot(value:string): Query {
    //     this.textNot = value;
    //     return this;
    // }

    // public setSupertypesAnd(value:string[]): Query {
    //     this.supertypesAnd = value;
    //     return this;
    // }

    // public setTypesAnd(value:string[]): Query {
    //     this.typesAnd = value;
    //     return this;
    // }

    // public setSubtypesAnd(value:string[]): Query {
    //     this.subtypesAnd = value;
    //     return this;
    // }

    // public setPageIndex(value:number): Query {
    //     this.pageIndex=value;
    //     return this;
    // }

    // public setPageSize(value:number):Query{
    //     this.pageSize=value;
    //     return this;
    // }

    // public set(key: string, value: string | undefined) {
    //     //TODO gotta be a butter way
    //     if (key === "nameAnd") {
    //         this.nameAnd = value;
    //     }
    //     else if (key === "nameOr") {
    //         this.nameOr = value;
    //     }
    //     else if (key === "textAnd") {
    //         this.textAnd = value;
    //     }
    //     else if (key === "textOr") {
    //         this.textOr = value;
    //     }
    //     else {
    //         throw new Error(`Query.set cannot set property ${key}`);
    //     }
    // }

    // public setArray(key: string, values: string[]) {
    //     if (key === "supertypesAnd") {
    //         this.supertypesAnd = values;
    //     }
    //     else if (key === "typesAnd") {
    //         this.typesAnd = values;
    //     }
    //     else if (key === "subtypesAnd") {
    //         this.subtypesAnd = values;
    //     }
    //     else {
    //         throw new Error(`Query.setArray cannot set property ${key}`);
    //     }
    // }
}