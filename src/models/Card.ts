import { ObjectId } from 'mongodb';
import { Printing } from './Printing';

export interface Card {
  _id: ObjectId,
  printing: Printing,
  colorIdentity: string[],
  colors: string[],
  convertedManaCost: number,
  edhrecRank: number,
  foreignData: {
    flavorText: string,
    language: string,
    name: string,
    text: string,
    type: string
  }[],
  identifiers: {
    scryfallOracleId: string,
  },
  keywords: string[],
  layout: string,
  legalities: {
    commander: string,
    duel: string,
    legacy: string,
    modern: string,
    penny: string,
    premodern: string,
    vintage: string,
  },
  manaCost: string,
  manaValue: number,
  name: string,
  power: string,
  printings: string[],
  purchaseUrls: {
    cardKingdom: string,
    cardKingdomFoil: string,
    cardmarket: string,
    tcgplayer: string,
  },
  rulings: [],
  subtypes: string[],
  supertypes: string[],
  text: string,
  toughness: string,
  type: string,
  types: string[]
}