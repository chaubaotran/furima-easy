import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

import config from "../config";

export const authenticationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.path === "/api/user/" && req.method === "POST") {
    return next();
  }

  const token = req.headers.authorization;

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized request");
  }

  try {
    jwt.verify(token, config.tokenSecet);

    next();
  } catch (err) {
    return res.status(StatusCodes.UNAUTHORIZED).send("Invalid token");
  }
};
