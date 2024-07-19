import express from "express";

import * as ratingController from "../controller/ratingController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(authMiddleware.authorizationUser, ratingController.createNewRating);

router.route("/book/:id").get(ratingController.getRatingsForBook);

export default router;
