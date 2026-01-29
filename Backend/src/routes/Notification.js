import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  getnotification,
  markAsRead,
} from "../controllers/Notification.js";

const router = express.Router();

router.get("/", protect, getnotification);
router.patch("/:id/read", protect, markAsRead);

export default router;