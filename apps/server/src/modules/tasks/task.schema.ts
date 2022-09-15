import { z } from "zod";

/** schema for new Task */
export const createTaskSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string().nullable(),
  }),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;

/** schema for update Task */
export const updateTaskSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    doneAt: z.string().nullable(),
  }),
});

export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;

/** schema for get Task */
export const getTaskSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export type GetTaskInput = z.infer<typeof getTaskSchema>;

/** schema for delete Task */
export const deleteTaskSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export type DeleteTaskInput = z.infer<typeof deleteTaskSchema>;
