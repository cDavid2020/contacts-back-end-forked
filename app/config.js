// Import the `dotenv` package
import dotenv from "dotenv";

// Load the environment variables defined in the .env file
dotenv.config();

// Export the `dbConn` object, which contains the value of the `DB_CONN` environment variable
export default {
  dbConn: process.env.DB_CONN,
};


/*
In this code, the dotenv library is imported, which allows the application to use environment variables. The dotenv.config() method is called, which loads the environment variables from a file named .env in the root directory of the application. The dbConn object is then exported, which contains the value of the DB_CONN environment variable.
 */

