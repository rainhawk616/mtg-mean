export interface MTGJson<Data> {
    meta: {
        date: Date,
        version: string,
    },
    data: Data,
}