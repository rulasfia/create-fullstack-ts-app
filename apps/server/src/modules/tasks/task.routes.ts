import express from "express";
import {
  createTaskHandler,
  deleteTaskHandler,
  getAllTasksHandler,
  getTaskDetailHandler,
  updateTaskHandler,
} from "./task.controller";

const router = express.Router();

router.get("/", getAllTasksHandler);
router.post("/", createTaskHandler);
router.get("/:id", getTaskDetailHandler);
router.patch("/:id", updateTaskHandler);
router.delete("/:id", deleteTaskHandler);

export default router;
