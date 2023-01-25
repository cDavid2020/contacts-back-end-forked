import dotenv from "dotenv";

dotenv.config();

export default {
  dbConn: process.env.DB_CONN,
};
