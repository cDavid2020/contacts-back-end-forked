import { Router } from "express";
import controller from "./controller.js";

const router = new Router();

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

export default router;
