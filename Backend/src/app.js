import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import dashboard from "./routes/dashboard.js";
import Notification from "./routes/Notification.js";
import Gettenant from "./controllers/gettenant.js";
import ProjectControllero from "./controllers/getProjects.js";
import {getTasksBytenantId} from "./controllers/taskController.js";
import {getTasksByuserId} from "./controllers/taskController.js";
// import Details from "./controllers/Details.js";
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks",taskRoutes);
app.use("/dashboard",dashboard);
app.use("/notification",Notification);
// health check
app.get("/", (req, res) => {
  res.send("TASKFLOW API RUNNING");
});
app.get("/tenant/:id",Gettenant);
app.get("/api/projects/:id",ProjectControllero.GetProjects);
app.get("/api/projects/member/:name", ProjectControllero.GetProjectsMember);
app.get("/api/tasks/:id",getTasksBytenantId);
app.get("/api/tasks/member/:id",getTasksByuserId);
app.get("/projects")

export default app;
