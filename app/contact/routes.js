import { Router } from "express";
import controller from "./controller.js";

const router = new Router();

// This will handle HTTP GET requests to /api/contacts
router.get("/", (_, response) => {
  controller
    .index()
    .then((contacts) => {
      response.json(contacts);
    })
    .catch((err) => {
      response.status(500).json(err);
    });
});

router.get("/contact", async (request, response) => {
  const { id, username } = request.query;

  let contact;

  if (id) {
    contact = await controller.showById(id).catch((err) => {
      if (err.message === "Invalid ID") {
        return response.status(400).json({ message: "Invalid ID" });
      }

      response.status(500).json(err);
    });
  } else {
    contact = await controller.showByUsername(username).catch((err) => {
      response.status(500).json(err);
    });
  }

  if (contact) {
    response.json(contact);
  } else {
    response.status(404).json({ message: "Contact not found" });
  }
});

router.post("/", (request, response) => {
  const newContact = request.body;

  // Validate the new contact
  if (!newContact.fullName) {
    response.status(400).json({ message: "Full name is required" });
  } else if (!newContact.username) {
    response.status(400).json({ message: "Username is required" });
  } else if (newContact.avatar && !newContact.avatar.startsWith("http")) {
    response.status(400).json({
      message: "Avatar must be a valid URL",
    });
  } else if (newContact.username.length < 3) {
    response.status(400).json({
      message: "Username must be at least 3 characters long",
    });
  } else if (newContact.username.length > 20) {
    response.status(400).json({
      message: "Username must be at most 20 characters long",
    });
  } else {
    controller.create(newContact).then((createdContact) => {
      response.status(201).json(createdContact);
    });
  }
});

export default router;
