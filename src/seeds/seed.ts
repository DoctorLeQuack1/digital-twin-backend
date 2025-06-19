import db from "../config/connection.js";
import models from "../models/index.js";
import cleanDB from "./cleanDB.js";

const { Tech } = models;

import techData from './techData.json' with { type: "json" };

db.once('open', async () => {
  await cleanDB('Tech', 'teches');

  await Tech.insertMany(techData);

  console.log('Technologies seeded!');
  process.exit(0);
});
