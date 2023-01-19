// Express is a web framework for Node.js
// We primarily use it to route users to different pages/responses
import express from "express";
import contactsRouter from "./contacts/routes.js";

const app = express();

app.use(express.json());

// This is a middleware function
// It will be called for every request
app.use("/api/contacts", contactsRouter);

app.listen(3000, () => {
  console.info("Server is running on port 3000");
});
