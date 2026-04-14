import app from "./app.js";
import { db_connection } from "./config/database.js";
import { env } from "./config/env.js";
import { setupAssociations } from "./models/associations.js";
import { connectRedis } from "./config/redis.js";
import { redisClient } from "./config/redis.js";


const startServer = async () => {
  try {
    await db_connection();
    await connectRedis();
    setupAssociations();

    app.listen(env.PORT, (err) => {
      if (err) {
        console.log("err: ", err);
      } else {
        console.log(`server running on port ${env.PORT}`);
      }
    });
  } catch (err) {
    console.log(`server connection failed for this port ${env.PORT}`);
    process.exit(1);
  }
};
startServer();


