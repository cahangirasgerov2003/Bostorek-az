import express from "express";

import * as bookController from "../controller/bookController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// router.get("/", bookController.getAllBooks);

// router.post("/", bookController.createNewBook);

// Alternative variant

router
  .route("/")
  .get(bookController.getAllBooks)
  .post(bookController.createNewBook);

router
  .route("/:id")
  .get(bookController.getABook)
  .put(bookController.updateABook)
  .delete(authMiddleware.authorizationUser, bookController.deleteABook);

export default router;
