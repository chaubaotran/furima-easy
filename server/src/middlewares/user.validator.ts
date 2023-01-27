import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import validator from "validator";

import { ErrorMessages } from "../shared/enum";

const userValidator = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { name, password, email } = req.body;

    const error = { name: "", email: "", password: "" };

    if (!name) error.name = ErrorMessages.MISSING_NAME;

    if (!password) {
      error.password = ErrorMessages.MISSING_PASSWORD;
    } else if (!validator.isStrongPassword(password)) {
      error.password = ErrorMessages.WEAK_PASSWORD;
    }
    
    if (!email) {
      error.email = ErrorMessages.MISSING_EMAIL;
    } else if (!validator.isEmail(email)) {
      error.email = ErrorMessages.INVALID_EMAIL;
    }

    if (error.name || error.password || error.email) {
      res.status(StatusCodes.BAD_REQUEST).json(error);
      return;
    }

    next();
  };
};

export default userValidator();
