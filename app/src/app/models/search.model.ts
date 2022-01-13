import { Card } from "./card.model";

export interface SearchResult {
    cards: Card[],
    pageIndex: number,
    pageSize: number,
    length: number
}