import type { NextFunction, Request, Response } from "express";
import type { AnyZodObject } from "zod";

export function validateResource(schema: AnyZodObject) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      return next();
    } catch (e: any) {
      console.error(e);
      return res.status(400).send(e.errors);
    }
  };
}
