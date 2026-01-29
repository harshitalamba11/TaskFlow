import express from "express";
import {
  register,
  registerUser,
  login,
} from "../controllers/authController.js";

const router = express.Router();

// Company + Admin registration
router.post("/register", register);

// Member registration
router.post("/register-user", registerUser);
// router.post("/register-admin", registerAdmin);

// Login
router.post("/login", login);

export default router;
