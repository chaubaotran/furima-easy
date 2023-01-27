import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { logger } from "../shared/logger";

export const unhandledErrorsHandlingMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (error) {
    const message = `Unhandled Error: ${error.name}, mesage: ${error.message}`;
    logger.error(message);

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: message });
  }

  next();
};

export const wrongUrlErrorHandlingMiddleware = (
  req: Request,
  res: Response
): void => {
  const message = `Wrong URL Error: ${req.path} does not exist`;
  logger.error(message);

  res.status(StatusCodes.NOT_FOUND).json({ error: message });
};
