import { Card } from "./Card";

export interface SearchResult {
    cards: Card[],
    pageIndex: number,
    pageSize: number,
    length: number
}