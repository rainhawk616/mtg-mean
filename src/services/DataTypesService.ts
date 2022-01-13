import { Collection, Db, InsertOneResult, ObjectId } from 'mongodb';
import { DataTypes } from '../models/DataTypes';

export class DataTypesService {
  private readonly collection: Collection;

  constructor(db: Db) {
    this.collection = db.collection('dataTypes');
  }

  async insert(entity: DataTypes): Promise<InsertOneResult<Document>> {
    const existingDataTypes = await this.find();
    if (existingDataTypes) {
      throw new Error("DataTypes already initialized");
    }
    return this.collection.insertOne(entity);
  }

  async find(): Promise<DataTypes | null> {
    const cursor = this.collection.find();
    const dataTypes = await cursor.toArray() as DataTypes[];
    if (dataTypes.length > 0) {
      return dataTypes[0];
    }
    return null
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
}