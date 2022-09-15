import express from "express";
import { validateResource } from "../../middleware/validateResource";
import {
  createTaskHandler,
  deleteTaskHandler,
  getAllTasksHandler,
  getTaskDetailHandler,
  updateTaskHandler
} from "./task.controller";
import {
  createTaskSchema,
  deleteTaskSchema,
  getTaskSchema,
  updateTaskSchema
} from "./task.schema";

const router = express.Router();

router.get("/", getAllTasksHandler);
router.post("/", validateResource(createTaskSchema),createTaskHandler);
router.get("/:id", validateResource(getTaskSchema),getTaskDetailHandler);
router.patch("/:id", validateResource(updateTaskSchema),updateTaskHandler);
router.delete("/:id", validateResource(deleteTaskSchema),deleteTaskHandler);

export default router;
