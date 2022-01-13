import { Printing } from "./Printing";

export default interface Set {
    baseSetSize: number,
    block: string,
    booster: unknown,
    cards: Printing[],
    code: string,
    codeV3: unknown,
    isForeignOnly: unknown,
    isFoilOnly: boolean,
    isPaperOnly: boolean,
    isOnlineOnly: boolean,
    isPartialPreview: boolean,
    keyruneCode: string,
    mcmId: number,
    mcmName: string,
    mtgoCode: unknown,
    name: string,
    parentCode: unknown,
    releaseDate: Date,
    sealedProduct: unknown,
    tcgplayerGroupId: number,
    tokens: unknown,
    totalSetSize: number,
    translations: unknown,
    type: string
}