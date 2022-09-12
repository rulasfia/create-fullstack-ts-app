import type { Request, Response } from "express";
import express from "express";

const PORT = 4000;

const app = express();

async function startServer() {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/", (_req: Request, res: Response) => {
    return res.json({ message: "Hello World!" });
  });

  app.get("/tasks", (_req: Request, res: Response) => {
    return res.json([
      { task: "Have a lunch", isDone: false },
      { task: "Go to bed", isDone: false },
    ]);
  });

  app.listen(PORT, () => {
    console.log(`Server started on port http://localhost:${PORT}`);
  });
}

startServer().catch((e) => {
  console.error(e);
  process.exit(1);
});
