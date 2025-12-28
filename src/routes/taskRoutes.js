import express from "express";
import {protect} from "../middlewares/authMiddleware.js";
import {adminaccess} from "../middlewares/roleMiddleware.js";
import {createTask,getTasksByProject} from "../controllers/taskController.js";

const router=express.Router();

router.post("/create",protect,adminaccess,createTask);
router.get("/project/:projectId",protect,adminaccess,getTasksByProject);

export default router;