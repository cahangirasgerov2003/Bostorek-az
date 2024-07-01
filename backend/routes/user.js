import express from "express";

import * as userController from "../controller/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/updateUser")
  .put(authMiddleware.authorizationUser, userController.updateUserDetails);

export default router;
