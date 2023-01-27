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
        response.status(400).json({ message: err.message });
      } else {
        response.status(500).json(err);
      }
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

router.put("/", async (request, response) => {
  const { id, username } = request.query;

  const incomingContact = request.body;

  let updatedContact;

  if (id) {
    updatedContact = await controller
      .updateById(id, incomingContact)
      .catch((err) => {
        if (err.message === "Invalid ID") {
          response.status(400).json({ message: err.message });
        } else if (err.name === "ValidationError" || err.name === "CastError") {
          response.status(400).json(err.message);
        } else if (err.path) {
          response.status(400).json({
            message: `Invalid request property in request body: ${err.path}`,
          });
        } else {
          response.status(500).json(err);
        }
      });
  } else if (username) {
    // If the username is provided, we will use it to update the contact
    updatedContact = await controller
      .updateByUsername(username, incomingContact)
      .catch((err) => {
        response.status(500).json(err);
      });
  }

  if (updatedContact) response.json(updatedContact);
});

router.delete("/", async (request, response) => {
  const { id, username } = request.query;

  let deletedContact;

  if (id) {
    deletedContact = await controller.deleteById(id).catch((err) => {
      if (err.message === "Invalid ID") {
        response.status(400).json({ message: err.message });
      }

      response.status(500).json(err);
    });
  } else if (username) {
    deletedContact = await controller
      .deleteByUsername(username)
      .catch((err) => {
        response.status(500).json(err);
      });
  }

  if (deletedContact) {
    response.json(deletedContact);
  } else {
    response.status(404).json({ message: "Contact not found" });
  }
});

export default router;
