import express from "express";

import * as commentController from "../controller/commentController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(commentController.getAllComments)
  .post(authMiddleware.authorizationUser, commentController.createNewComment);

router
  .route("/user/:id")
  .get(authMiddleware.authorizationUser, commentController.getCommentsByUser);

router.route("/book/:id").get(commentController.getCommentsForBook);

router
  .route("/:id")
  .put(authMiddleware.authorizationUser, commentController.updateAComment)
  .delete(authMiddleware.authorizationUser, commentController.deleteAComment);

router
  .route("/:id/upvote")
  .post(authMiddleware.authorizationUser, commentController.upvoteAComment);

router
  .route("/:id/cancelUpvote")
  .post(
    authMiddleware.authorizationUser,
    commentController.cancelUpvoteAComment
  );

export default router;
