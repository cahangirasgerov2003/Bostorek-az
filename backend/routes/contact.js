import express from "express";

import * as contactController from "../controller/contactController.js";

const router = express.Router();

router.route("/").post(contactController.sendMessageToMail);

export default router;
