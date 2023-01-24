import { Router } from "express";

const router = new Router();

// TODO: Use the controller to get all of the contacts
router.get("/", (_, response) => {});

// ':id' is a route request parameter (params)
// It will be available in the request.params object
// e.g. /api/contacts/1 => { id: 1 }
// 'id' can be any name
router.get("/:id", (request, response) => {
  
  if (contact) {
    response.json(contact);
  } else {
    response.status(404).json({ message: "Contact not found" });
  }
});

router.post("/", (request, response) => {
  
  response.send("ok");
});

router.put("/:id", (request, response) => {
  // Id that needs to be updated
  const id2Update = request.params.id;
  const updatedContact = request.body;

  // Use map to update the contact
  // If the contact id matches the id in the request params, update it
  // Otherwise, return the original contact
  CONTACTS.map((contact) => {
    if (contact.id === Number(id2Update)) {
      return updatedContact;
    }

    return contact;
  });

  response.json({
    message: `Contact updated successfully with id: ${id2Update}`,
  });
});

router.delete("/:id", (request, response) => {
  const id2Delete = request.params.id;

  // Filter out the contact with the id to delete
  const updatedContacts = CONTACTS.filter(
    (contact) => contact.id !== Number(id2Delete)
  );

  response.json({
    message: `Contact deleted successfully with id: ${id2Delete}`,
    updatedContacts,
  });
});

export default router;
