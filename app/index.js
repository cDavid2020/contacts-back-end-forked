given this code print it in code blocks. it includes // comments in the notes. explain specifically what each line is doing to an entry level javascript developer

import express from "express";
import contactsRouter from "./contact/routes.js";

const app = express();

app.use(express.json());
app.use("/api/contacts", contactsRouter);

app.listen(3000, () => {
  console.info("Server is running on port 3000");
});
