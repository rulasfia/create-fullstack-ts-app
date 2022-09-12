import db from "@/utils/prisma";
import type { Task } from "@prisma/client";

export async function getAllTasks() {
  return await db.task.findMany();
}

export async function getTaskById(id: string) {
  return await db.task.findUnique({
    where: { id },
  });
}

export async function createTask(task: Pick<Task, "name" | "description">) {
  return await db.task.create({
    data: task,
  });
}

export async function updateTask(id: string, task: Partial<Task>) {
  return await db.task.update({
    where: { id },
    data: task,
  });
}

export async function deleteTask(id: string) {
  return await db.task.delete({
    where: { id },
  });
}
