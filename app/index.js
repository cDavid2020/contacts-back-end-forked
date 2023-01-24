import express from "express";
import contactsRouter from "./contact/routes.js";

const app = express();

app.use(express.json());
app.use("/api/contacts", contactsRouter);

app.listen(3000, () => {
  console.info("Server is running on port 3000");
});
