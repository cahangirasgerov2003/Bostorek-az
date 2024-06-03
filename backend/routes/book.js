import express from "express";

import * as bookController from "../controller/bookController.js";

const router = express.Router();

router.get("/", bookController.getAllBooks);

router.post("/", bookController.createNewBook);

router.get("/:id", bookController.getABook);

router.put("/:id", bookController.updateABook);

router.delete("/:id", bookController.deleteABook);

export default router;
