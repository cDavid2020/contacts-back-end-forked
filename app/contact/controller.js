// This is the gateway to the database
import mongoose from "mongoose";
import config from "../config.js";
import Contact from "./Contact.js";

// Connect to the database
mongoose
  .connect(config.getDbConn("contacts"))
  .then(() => {
    console.info("Connected to the database");
  })
  .catch((err) => {
    console.error("Error connecting to the database", err.message);
  });

export default {
  // TODO: Get all contacts
};
