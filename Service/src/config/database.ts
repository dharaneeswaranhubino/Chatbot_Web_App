import { Sequelize } from "sequelize";
import { env } from "./env.js";

export const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASSWORD, {
  host: env.DB_HOST,
  port: Number(env.DB_PORT),
  dialect: env.DB_DIALECT,
  logging: false,
});

export const db_connection = async () => {
  try {
    await sequelize.authenticate();
    console.log(`Db connected successfully!`);
  } catch (err) {
    console.log(`DB connection faild with err ${err}`);
    process.exit(1);
  }
};
