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

const options = {
  returnDocument: "after",
  runValidators: true,
};

const contactController = {
  // Get all contacts
  index() {
    return Contact.find();
  },

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

  updateById(id2Update, updatedContact) {
    if (mongoose.Types.ObjectId.isValid(id2Update)) {
      return Contact.findByIdAndUpdate(
        id2Update,

        // The updated contact only needs to have the fields that are being updated
        updatedContact,
        options
      );
    }

    // Wrap the error in a rejected promise so that it can be CAUGHT.
    // This is being AWAITed in the router (it expects a promise).
    return Promise.reject(new Error("Invalid ID"));
  },

  updateByUsername(username, updatedContact) {
    return Contact.findOneAndUpdate({ username }, updatedContact, options);
  },

  deleteById(id2Delete) {
    if (mongoose.Types.ObjectId.isValid(id2Delete)) {
      return Contact.findByIdAndDelete(id2Delete);
    }

    // Wrap the error in a rejected promise so that it can be CAUGHT.
    return Promise.reject(new Error("Invalid ID"));
  },

  deleteByUsername(username) {
    return Contact.findOneAndDelete({ username });
  },
};

export default contactController;
