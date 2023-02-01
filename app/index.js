// Import the express library
import express from "express";
// Import the contacts routes from the contact/routes.js file
import contactsRouter from "./contact/routes.js";

// Create an instance of express as a constant variable named "app"
const app = express();

// Use the built-in express.json() middleware to parse JSON in the request body
app.use(express.json());

// Use the contactsRouter for any incoming request to the "/api/contacts" endpoint
app.use("/api/contacts", contactsRouter);

// Start the server on port 3000 and log a message when the server has started
app.listen(3000, () => {
  console.info("Server is running on port 3000");
});


/*
This code creates a basic Express.js web server. The express library is imported and used to create an instance of the express application, stored in the constant app. The app.use(express.json()) line sets up middleware that parses JSON in the request body.

The app.use("/api/contacts", contactsRouter) line sets up a route for incoming requests to the "/api/contacts" endpoint and uses the contactsRouter imported from the ./contact/routes.js file.

Finally, the app.listen(3000) method starts the server and listens for incoming requests on port 3000. When the server is started, a message "Server is running on port 3000" will be logged to the console using console.info().

 */