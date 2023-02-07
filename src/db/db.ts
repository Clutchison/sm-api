import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongo: MongoMemoryServer;

const setUp = async () => {
  console.log('starting mongo')
  mongo = await MongoMemoryServer.create();
  const url = mongo.getUri();

  await mongoose.connect(url);
};

const dropDatabase = async () => {
  if (mongo) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  console.log('stopping mongo')
    await mongo.stop();
  }
};

const dropCollections = async () => {
  if (mongo) {
    Object.values(mongoose.connection.collections)
      .forEach(collection => collection.drop());
  }
};

export default {
  setUp,
  dropDatabase,
  dropCollections
}