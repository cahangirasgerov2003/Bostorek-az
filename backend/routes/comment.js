import express from "express";

import * as commentController from "../controller/commentController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(authMiddleware.authorizationUser, commentController.createNewComment);

export default router;
