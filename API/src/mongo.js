import config from "../config.json" assert { type: "json" };
import { MongoClient } from "mongodb";

export const mongo = new MongoClient(config.mongo.dbUrl, {
  useUnifiedTopology: true,
});

await mongo.connect();

export const db = mongo.db(config.mongo.dbName);
