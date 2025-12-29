import {dashboard} from "../controllers/dashboard.js";
import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { adminaccess } from "../middlewares/roleMiddleware.js";

const router=express.Router();

router.get("/",protect,adminaccess,dashboard);

export default router;