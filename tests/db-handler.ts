import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongo: any;
const createMemoryServer = async () => {
  mongo = await MongoMemoryServer.create();
};

class dbHandler {
  /**
   * Connect to the in-memory database.
   */
  connect = async () => {
    await createMemoryServer();
    const uri = mongo.getUri();

    const mongooseOpts = {
      useNewUrlParser: true,
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000,
    };

    await mongoose.connect(uri, mongooseOpts);
  };

  /**
   * Drop database, close the connection and stop mongod.
   */
  closeDatabase = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongo.stop();
  };

  /**
   * Remove all the data for all db collections.
   */
  clearDatabase = async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  };
}

export { dbHandler };
