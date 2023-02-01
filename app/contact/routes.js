// Import the Router class from the express library
import { Router } from "express";

// Import the controller file which contains the logic for handling API requests
import controller from "./controller.js";

// Create a new instance of the Router class
const router = new Router();

// This will handle HTTP GET requests to the root route '/api/contacts'
router.get("/", (_, response) => {
  // Call the index() method on the controller
  controller
    .index()
    .then((contacts) => {
      // If the index() method returns successfully, send the returned contacts data as a JSON response
      response.json(contacts);
    })
    .catch((err) => {
      // If the index() method encounters an error, send a JSON response with a status code of 500 and the error message
      response.status(500).json(err);
    });
});

// This will handle HTTP GET requests to the route '/api/contacts/contact'
router.get("/contact", async (request, response) => {
  // Destructure the id and username from the query parameters in the request object
  const { id, username } = request.query;

  let contact;

  // If the id is provided
  if (id) {
    // Call the showById() method on the controller and catch any errors
    contact = await controller.showById(id).catch((err) => {
      // If the error message is "Invalid ID", send a JSON response with a status code of 400 and the error message
      if (err.message === "Invalid ID") {
        response.status(400).json({ message: err.message });
      } else {
        // If the error message is anything other than "Invalid ID", send a JSON response with a status code of 500 and the error message
        response.status(500).json(err);
      }
    });
  }
  // If the username is provided
  else if (username) {
    // Call the showByUsername() method on the controller and catch any errors
    contact = await controller.showByUsername(username).catch((err) => {
      // Send a JSON response with a status code of 500 and the error message
      response.status(500).json(err);
    });
  }
  // If neither the id nor the username is provided
  else {
    // Send a JSON response with a status code of 400 and a message indicating that either the id or username is required
    return response.status(400).json({ message: "ID or username is required" });
  }

  // If the contact is found
  if (contact) {
    // Send a JSON response with the contact data
    response.json(contact);
  }
  // If the contact is not found and is explicitly set to null
  else if (contact === null) {
    // Send a JSON response with a status code of 404 and a message indicating that the contact was not found
    response.status(404).json({ message: "Contact not found" });
  }
});

// This will handle HTTP POST requests to the root route '/api/contacts'
router.post("/", (request, response) => {
  // Get the new contact data from the request body
  const newContact = request.body;

  // Call the create
