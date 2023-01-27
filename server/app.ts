import express from "express";
import cors from "cors";

import connectDB from "./src/db/connect";
import { logger } from "./src/shared/logger";
import authRouter from "./src/routes/auth.route";
import userRouter from "./src/routes/user.routes";
import config from "./src/config";
import {
  unhandledErrorsHandlingMiddleware,
  wrongUrlErrorHandlingMiddleware,
} from "./src/middlewares/error-handling.middleware";
import { authenticationMiddleware } from "./src/middlewares/auth.middleware";
import { httpLoggingMiddleware } from "./src/middlewares/http-logging.middleware";

const app = express();
app.use(cors());
app.use(express.json());

app.use(httpLoggingMiddleware);
app.use("/api/", authRouter);
app.use(authenticationMiddleware);
app.use("/api/user/", userRouter);
app.all("*", wrongUrlErrorHandlingMiddleware);
app.use(unhandledErrorsHandlingMiddleware);

const start = async () => {
  try {
    await connectDB(config.databaseUrl);
    app.listen(config.port, () => {
      logger.info(`Server is listening on http://localhost:${config.port}`);
    });
  } catch (error) {
    logger.error(error);
  }
};

start();
