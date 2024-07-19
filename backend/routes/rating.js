import express from "express";

import * as ratingController from "../controller/ratingController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(authMiddleware.authorizationUser, ratingController.createNewRating);

router
  .route("/user/:id")
  .get(authMiddleware.authorizationUser, ratingController.getRatingsByUser);

router.route("/book/:id").get(ratingController.getRatingsForBook);

router
  .route("/:id")
  .put(authMiddleware.authorizationUser, ratingController.updateARating)
  .delete(authMiddleware.authorizationUser, ratingController.deleteARating);

export default router;
