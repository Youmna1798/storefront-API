import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config(); // Load the .env file's content into the process.env object

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, ENV, DB_TEST } = process.env;

const client = new Pool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: ENV === "dev" ? DB_NAME : DB_TEST,
});

export default client;
