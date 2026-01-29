import express from "express";
import {protect} from "../middlewares/authMiddleware.js";
import {adminaccess} from "../middlewares/roleMiddleware.js";
import {createTask,getTasksByProject} from "../controllers/taskController.js";
import {taskComment,getComment} from "../controllers/taskComment.js";

const router=express.Router();

router.post("/create",protect,adminaccess,createTask);
router.get("/project/:projectId",protect,adminaccess,getTasksByProject);
router.post("/:taskId/comment",protect,taskComment);
router.get("/:taskId/comments",protect,getComment);
export default router;