import { ObjectId } from "mongodb";

export interface DataTypes {
    readonly _id: ObjectId;
    
    card: {
        availability: string[],
        borderColor: string[],
        colorIdentity: string[],
        colorIndicator: string[],
        colors: string[],
        duelDeck: string[],
        finishes: string[],
        frameEffects: string[],
        frameVersion: string[],
        layout: string[],
        promoTypes: string[],
        rarity: string[],
        side: string[],
        subtypes: string[],
        supertypes: Set<string>,
        types: string[],
        watermark: string[]
    }

    deck: {
        type: string[]
    };

    foreignData: {
        language: string[]
    };

    keywords: {
        abilityWords: string[],
        keywordAbilities: [],
        keywordActions: []
    };

    set: {
        type: string[]
    }
}