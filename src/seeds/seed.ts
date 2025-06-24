import db from "../config/connections.js";
import { Users } from "../models/index.js";
import cleanDB from "./cleanDB.js";

import usersData from './usersData.json' with { type: "json" };

db.once('open', async () => {
  try {
    await cleanDB();
    await Users.insertMany(usersData);

    console.log('Users collection seeded in mongoDB!');
    process.exit(0);

  } catch (error: unknown) {

    if (error instanceof Error) {
      console.error('Error seeding database:', error.message);
    } else {
      console.error('Unknown error seeding database');
    }
    process.exit(1);
  }
  
});
