import type { Request, Response } from "express";
import type {
  CreateTaskInput,
  DeleteTaskInput,
  GetTaskInput,
  UpdateTaskInput,
} from "./task.schema";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
} from "./task.service";

export async function getAllTasksHandler(_req: Request, res: Response) {
  const tasks = await getAllTasks();
  return res.status(200).json(tasks);
}

export async function getTaskDetailHandler(
  req: Request<GetTaskInput["params"]>,
  res: Response
) {
  const { id } = req.params;
  const task = await getTaskById(id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  return res.status(200).json(task);
}

export async function createTaskHandler(
  req: Request<{}, {}, CreateTaskInput["body"]>,
  res: Response
) {
  const { name, description } = req.body;

  const newTask = await createTask({ name, description });

  return res.status(201).json(newTask);
}

export async function updateTaskHandler(
  req: Request<UpdateTaskInput["params"], {}, UpdateTaskInput["body"]>,
  res: Response
) {
  const { id } = req.params;
  const body = req.body;

  const currentTask = await getTaskById(id);
  if (!currentTask) {
    return res.status(404).json({ message: "Task not found" });
  }

  // convert string to date
  const doneAt = body.doneAt ? new Date(body.doneAt) : null;

  const updatedTask = await updateTask(id, {
    name: body?.name ?? currentTask.name,
    description: body?.description ?? currentTask.description,
    doneAt: body.doneAt !== undefined ? doneAt : currentTask.doneAt,
  });

  return res.status(200).json(updatedTask);
}

export async function deleteTaskHandler(
  req: Request<DeleteTaskInput["params"]>,
  res: Response
) {
  const { id } = req.params;

  await deleteTask(id);

  return res.status(200).json({ message: "Task deleted successfully" });
}
