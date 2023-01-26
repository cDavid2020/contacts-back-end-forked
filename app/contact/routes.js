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
        return response.status(400).json({ message: err.message });
      }

      response.status(500).json(err);
    });
  } else if (username) {
    contact = await controller.showByUsername(username).catch((err) => {
      response.status(500).json(err);
    });
  } else {
    return response.status(400).json({ message: "ID or username is required" });
  }

  if (contact) {
    response.json(contact);
  } else {
    response.status(404).json({ message: "Contact not found" });
  }
});

router.post("/", (request, response) => {
  const newContact = request.body;

  controller
    .create(newContact)
    .then((createdContact) => {
      response.status(201).json(createdContact);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return response.status(400).json(err.message);
      }

      response.status(500).json(err);
    });
});

// TODO: Implement routes to update and delete stuff in the controller

export default router;
