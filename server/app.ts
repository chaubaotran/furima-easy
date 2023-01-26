import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./src/db/connect";
import { logger } from "./src/shared/logger";
import router from "./src/routes/user.routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT;
const databaseUrl = process.env.DATABASE_URL || "";

app.use('/api/user/', router);

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
