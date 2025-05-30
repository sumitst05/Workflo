import express from "express";

import authController from "../controllers/auth.js";

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.post("/signout", authController.signout);
router.post("/google", authController.googleAuth);

export default router;
