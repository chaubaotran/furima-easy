import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import connectDB from "./db/connect";
import { logger } from "./shared/logger";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const databaseUrl = process.env.DATABASE_URL || "";

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

const start = async () => {
  try {
    await connectDB(databaseUrl);
    app.listen(port, () => {
      logger.info(`Server is listening on http://localhost:${port}`);
    });
  } catch (error) {
    logger.error(error);
  }
};

start();
