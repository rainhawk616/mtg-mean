import { Collection, Db, Document, Filter, InsertOneResult, ObjectId, WithId } from 'mongodb';
import { Card } from '../models/Card';
import Query from '../models/Query';

export class CardService {
  private readonly collection: Collection;

  constructor(db: Db) {
    this.collection = db.collection('cards');
  }

  async insert(entity: Card): Promise<InsertOneResult<Document>> {
    return this.collection.insertOne(entity);
  }

  async find(_id: ObjectId): Promise<Card> {
    return (await this.collection.findOne({ _id })) as Card;
  }

  async findAll(limit: number = 50, skip: number = 0): Promise<Card[]> {
    const cursor = this.collection.find()
      .sort({ name: -1 })
      .limit(limit)
      .skip(skip);

    const results = await cursor.toArray() as Card[];

    return results;
  }

  update(id: ObjectId): Promise<void> {
    throw new Error('Method not implemented.');
  }

  delete(id: ObjectId): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async deleteAll() {
    return this.collection.deleteMany({});
  }

  async insertMany(atomics: Card[]) {
    return this.collection.insertMany(atomics);
  }

  async search(query: Query): Promise<{
    cards: Card[],
    pageIndex: number,
    pageSize: number,
    length: number
  }> {
    const {
      nameAnd,
      nameOr,
      nameNot,
      textAnd,
      textOr,
      textNot,
      supertypesAnd,
      typesAnd,
      subtypesAnd,
      pageSize,
      pageIndex,
    } = query;

    const filter: {
      $and?: any[],
      $or?: any[],
    } = {};

    if (nameAnd) {
      if (!filter.$and) {
        filter.$and = [];
      }
      nameAnd.split(' ').forEach((name) => {
        filter.$and!.push({
          name: {
            $regex: name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
            $options: 'i'
          }
        })
      })
    }

    if (nameOr) {
      if (!filter.$or) {
        filter.$or = [];
      }
      nameOr.split(' ').forEach((name) => {
        filter.$or!.push({
          name: {
            $regex: name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
            $options: 'i'
          }
        })
      })
    }

    if (textAnd) {
      if (!filter.$and) {
        filter.$and = [];
      }
      textAnd.split(' ').forEach((text) => {
        filter.$and!.push({
          text: {
            $regex: text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
            $options: 'i'
          }
        })
      })
    }

    if (textOr) {
      if (!filter.$or) {
        filter.$or = [];
      }
      textOr.split(' ').forEach((name) => {
        filter.$or!.push({
          text: {
            $regex: name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
            $options: 'i'
          }
        })
      })
    }

    if (supertypesAnd && supertypesAnd.length > 0) {
      if (!filter.$and) {
        filter.$and = [];
      }
      filter.$and.push({
        supertypes: {
          $all: supertypesAnd
        }
      })
    }

    if (typesAnd && typesAnd.length > 0) {
      if (!filter.$and) {
        filter.$and = [];
      }
      filter.$and.push({
        types: {
          $all: typesAnd
        }
      })
    }

    if (subtypesAnd && subtypesAnd.length > 0) {
      if (!filter.$and) {
        filter.$and = [];
      }
      filter.$and.push({
        subtypes: {
          $all: subtypesAnd
        }
      })
    }

    console.log(JSON.stringify(filter, null, 2));

    const limit = query.pageSize;
    const skip = query.pageIndex * query.pageSize;


    const cursor = this.collection.find(filter)
      .limit(limit)
      .skip(skip)
      .sort({ "name": 1 })

    const cards = await cursor.toArray() as Card[];
    const length = await this.searchCount(filter);

    return {
      cards,
      pageIndex,
      pageSize,
      length
    };
  }

  async searchCount(filter: Filter<Document>): Promise<number> {
    //let filter2: Filter<TSchema>;
    return this.collection.countDocuments(filter);
  }
}