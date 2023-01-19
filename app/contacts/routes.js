import { Router } from "express";

const CONTACTS = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
];

const router = new Router();

// TODO: Write a GET route to do a search with QUERY PARAMETERS

router.get("/api/contacts", (_, response) => {
  response.json(CONTACTS);
});

// ':id' is a route request parameter (params)
// It will be available in the request.params object
// e.g. /api/contacts/1 => { id: 1 }
// 'id' can be any name
router.get("/api/contacts/:id", (request, response) => {
  const { id } = request.params;

  const contact = CONTACTS.find((contact) => contact.id === Number(id));

  /**
   * If the contact is not found, we return a 404 status code
   * and a message to the user
   * 404 means the resource was not found
   * Otherwise, send back the found contact with a 200 status code
   * 200 means the resource was found
   */
  if (contact) {
    response.json(contact);
  } else {
    response.status(404).json({ message: "Contact not found" });
  }
});

// Express uses middleware to parse the body of a request
// This is required to access the body of a POST request
router.use(express.json());

router.post("/api/contacts", (request, response) => {
  console.log(request.body);
  response.send("ok");
});

router.put("/api/contacts/:id", (request, response) => {
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

router.delete("/api/contacts/:id", (request, response) => {
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
