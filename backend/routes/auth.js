import express from "express";

import * as authController from "../controller/authController.js";

const router = express.Router();

router.route("/register").post(authController.createNewUser);

export default router;
