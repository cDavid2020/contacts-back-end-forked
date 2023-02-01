// Importing the necessary modules and dependencies
import mongoose from "mongoose";
import config from "../config.js";
import Contact from "./Contact.js";

// Enforcing strict query mode to prevent errors while querying the database
mongoose.set("strictQuery", true);

// Connecting to the database using the URL in the config file
mongoose
  .connect(config.dbConn)
  .then(() => {
    console.info("Connected to the database");
  })
  .catch((err) => {
    console.error("Error connecting to the database", err.message);
  });

// Options for update methods
const options = {
  rawResult: true, // return the raw result of the query
  runValidators: true, // validate the data before running the query
  strict: "throw", // throw an error if a field is not defined in the schema
};

// Object with functions to handle contacts in the database
const contactController = {
  // Get all contacts
  index() {
    return Contact.find(); // Returns a promise with all the contacts in the database
  },

  // Get a contact by ID
  showById(id) {
    if (mongoose.Types.ObjectId.isValid(id)) {
      return Contact.findById(id); // Returns a promise with the contact that matches the given ID
    }

    // Returns a rejected promise with an error message if the ID is invalid
    return Promise.reject(new Error("Invalid ID"));
  },

  // Get a contact by username
  showByUsername(username) {
    return Contact.findOne({ username }); // Returns a promise with the contact that matches the given username
  },

  // Create a new contact
  create(contact) {
    return Contact.create(contact); // Returns a promise with the newly created contact
  },

  // Update a contact by ID
  updateById(id2Update, updatedContact) {
    if (updatedContact.id || updatedContact._id) {
      // Returns a rejected promise with an error message if the ID field is present in the update data
      return Promise.reject(new Error("ID cannot be updated"));
    }

    if (mongoose.Types.ObjectId.isValid(id2Update)) {
      // Update the contact that matches the given ID
      return Contact.findByIdAndUpdate(
        id2Update,
        updatedContact, // Data to update the contact with
        options
      );
    }

    // Returns a rejected promise with an error message if the ID is invalid
    return Promise.reject(new Error("Invalid ID"));
  },

  // Update a contact by username
  updateByUsername(username, updatedContact) {
    return Contact.findOneAndUpdate({ username }, updatedContact, options); // Updates the contact that matches the given username
  },

  // Delete a contact by ID
  deleteById(id2Delete) {
    if (mongoose.Types.ObjectId.isValid(id2Delete)) {
      return Contact.findByIdAndDelete(id2Delete); // Deletes the contact that matches the given ID
    }

    // Returns a rejected promise with an error message if the ID is invalid
    return Promise.reject(new Error("Invalid ID"));

