import cors from "cors";
import * as dotenv from "dotenv";
import type { Request, Response } from "express";
import express from "express";
import taskRouter from "./modules/tasks/task.routes";
import db from "./utils/prisma";

/** load env variable */
dotenv.config();
const PORT = process.env.PORT || 4000;

/** initiate express app */
const app = express();

async function startServer() {
  /** load global middleware */
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  /** 'root' route to check server status */
  app.get("/", (_req: Request, res: Response) => {
    return res.json({ message: "Server running!" });
  });

  /** load task router */
  app.use("/api/tasks", taskRouter);

  app.listen(PORT, () => {
    console.log(`Server started on port http://localhost:${PORT}`);
  });
}

startServer()
  .then(async () => {
    /** disconnect from db when app close */
    await db.$disconnect();
  })
  .catch(async (e) => {
    /** main function error handler, exit app on error */
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
