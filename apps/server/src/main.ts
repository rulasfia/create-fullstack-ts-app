import type { Task } from "@rulasfia/api-types";
import cors from "cors";
import type { Request, Response } from "express";
import express from "express";

const PORT = 4000;

const app = express();

async function startServer() {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/", (_req: Request, res: Response) => {
    return res.json({ message: "Hello World!" });
  });

  app.get("/api/tasks", (_req: Request, res: Response) => {
    const data = [
      { id: 1, task: "Have a lunch", isDone: false },
      { id: 2, task: "Go to bed", isDone: false },
    ];

    return res.json(data);
  });

  app.listen(PORT, () => {
    console.log(`Server started on port http://localhost:${PORT}`);
  });
}

startServer().catch((e) => {
  console.error(e);
  process.exit(1);
});
