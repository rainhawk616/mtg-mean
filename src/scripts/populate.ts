import got, { HTTPError, Response } from 'got';
import { MongoClient } from 'mongodb'
import { Card } from '../models/Card';
import { MTGJson } from '../models/MTGJson';
import Set from '../models/Set'
import dotenv from 'dotenv';
import { CardService } from '../services/CardService';
import { DataTypesService } from '../services/DataTypesService';
import { DataTypes } from '../models/DataTypes';

dotenv.config();

async function main() {
    if (!process.env.MONGODB_URL) {
        throw new Error('process.env.MONGODB_URL is required');
    }

    const client = new MongoClient(process.env.MONGODB_URL);
    const db = client.db('mtg-mean');
    const cardService = new CardService(db);
    const dataTypesService = new DataTypesService(db);

    let enumsResponse: Response<string>;

    try {
        enumsResponse = await got.get('https://mtgjson.com/api/v5/EnumValues.json')
    } catch (error) {
        if (error instanceof HTTPError) {
            console.log(error.response.body);
        }

        return;
    }

    const mtgDataTypes: MTGJson<DataTypes> = JSON.parse(enumsResponse.body);
    const dataTypes = mtgDataTypes.data;

    let atomicResponse;

    try {
        atomicResponse = await got.get('https://mtgjson.com/api/v5/AtomicCards.json');
    } catch (error) {
        if (error instanceof HTTPError) {
            console.log(error.response.body);
        }
        return;
    }

    const atomicCardsResponse: MTGJson<{ [name: string]: Card[] }> = JSON.parse(atomicResponse.body);
    let atomicCards: Card[] = Object.values(atomicCardsResponse.data).flat();

    let printingsResponse;

    try {
        printingsResponse = await got.get('https://mtgjson.com/api/v5/AllPrintings.json');
    } catch (error) {
        if (error instanceof HTTPError) {
            console.log(error.response.body);
        }
        return;
    }

    const printingsResponseBody: MTGJson<{ [name: string]: Set }> = JSON.parse(printingsResponse.body);
    const sets: Set[] = Object.values(printingsResponseBody.data).sort((setA, setB) => {
        const a = new Date(setA.releaseDate);
        const b = new Date(setB.releaseDate);

        return b.getTime() - a.getTime();
    });


    atomicCards.forEach((card) => {
        if (!card.printings || card.printings.length === 0) {
            console.log(card.name);
            return;
        }

        const filteredSets = sets.filter((set) => {
            return card.printings.includes(set.code)
        });

        if (filteredSets.length > 0) {
            const filteredCards = filteredSets[0].cards.filter((setCard) => card.identifiers.scryfallOracleId === setCard.identifiers.scryfallOracleId);
            if (filteredCards.length > 0) {
                card.printing = filteredCards[0];
            }
        }
    })

    try {
        await client.connect();
        await cardService.deleteAll()
        await dataTypesService.deleteAll();
        await cardService.insertMany(atomicCards);
        await dataTypesService.insert(dataTypes);
    } finally {
        client.close();
    }
}

(async () => {
    await main();
})();

// download('https://mtgjson.com/api/v5/AllPrintings.json', './sets/AllPrintings.json');
// download('https://mtgjson.com/api/v5/AtomicCards.json', './sets/AtomicCards.json');
// download('https://mtgjson.com/api/v5/EnumValues.json', './sets/EnumValues.json');