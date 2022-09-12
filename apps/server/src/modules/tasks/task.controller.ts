import type { Task } from "@prisma/client";
import type { Request, Response } from "express";
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
  req: Request<{ id: string }>,
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
  req: Request<{}, {}, Pick<Task, "name" | "description">>,
  res: Response
) {
  const { name, description } = req.body;

  const newTask = await createTask({ name, description });

  return res.status(201).json(newTask);
}

export async function updateTaskHandler(
  req: Request<
    { id: string },
    {},
    Partial<Pick<Task, "name" | "description" | "doneAt">>
  >,
  res: Response
) {
  const { id } = req.params;
  const { name, description, doneAt } = req.body;

  const currentTask = await getTaskById(id);
  if (!currentTask) {
    return res.status(404).json({ message: "Task not found" });
  }

  const updatedTask = await updateTask(id, {
    name: name ?? currentTask.name,
    description: description ?? currentTask.description,
    doneAt: doneAt ?? currentTask.doneAt,
  });

  return res.status(200).json(updatedTask);
}

export async function deleteTaskHandler(
  req: Request<{ id: string }>,
  res: Response
) {
  const { id } = req.params;

  await deleteTask(id);

  return res.status(200).json({ message: "Task deleted successfully" });
}
