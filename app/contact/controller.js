// This is the gateway to the database
import mongoose from "mongoose";
import config from "../config.js";
import Contact from "./Contact.js";

// Enforce strict query mode to prevent queries for fields that don't exist in the schema
mongoose.set("strictQuery", true);

// Connect to the database
mongoose
  .connect(config.dbConn)
  .then(() => {
    console.info("Connected to the database");
  })
  .catch((err) => {
    console.error("Error connecting to the database", err.message);
  });

const contactController = {
  // Get all contacts
  index() {
    return Contact.find();
  },

  // get a single contact
  showById(id) {
    if (mongoose.Types.ObjectId.isValid(id)) {
      return Contact.findById(id);
    }

    // Wrap the error in a rejected promise so that it can be CAUGHT.
    return Promise.reject(new Error("Invalid ID"));
  },

  showByUsername(username) {
    return Contact.findOne({ username });
  },

  create(contact) {
    return Contact.create(contact);
  },

  update(id2Update, updatedContact) {
    // TODO: Do we need to validate the ID?
    return Contact.findByIdAndUpdate(id2Update, updatedContact, {
      runValidators: true,
    });
  },

  delete(id2Delete) {
    return Contact.findByIdAndDelete(id2Delete);
  },
};

export default contactController;
