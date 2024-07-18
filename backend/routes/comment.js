import express from "express";

import * as commentController from "../controller/commentController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(authMiddleware.authorizationUser, commentController.createNewComment);

router
  .route("/user/:id")
  .get(authMiddleware.authorizationUser, commentController.getCommentsByUser);

router.route("/book/:id").get(commentController.getCommentsForBook);

router
  .route("/:id")
  .put(authMiddleware.authorizationUser, commentController.updateAComment)
  .delete(authMiddleware.authorizationUser, commentController.deleteAComment);

export default router;
