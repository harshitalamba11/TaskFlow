import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { adminaccess } from "../middlewares/roleMiddleware.js";
import {createProject} from "../controllers/projectController.js";

const router = express.Router();

router.post(
  "/create",
  protect,
  adminaccess,
  createProject,
  (req, res) => {
    res.json({
      message: "Project created successfully",
      tenantId: req.user.tenantId,
      createdBy: req.user.userId,
    });
  }
);

export default router;
