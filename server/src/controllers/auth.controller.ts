import { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModel from "../models/User";
import { ErrorMessages } from "../shared/enum";
import config from "../config";

export default class AuthController {
  public static async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(StatusCodes.BAD_REQUEST).send({ error: ErrorMessages.BAD_REQUEST });
      return;
    }

    try {
      const user = await UserModel.findOne({ email: email });

      if (!user) {
        res.status(StatusCodes.BAD_REQUEST).json({ email: ErrorMessages.NO_EMAIL_FOUND });
        return;
      }

      const isPasswordMatched = await bcrypt.compare(password, user.password);

      if (!isPasswordMatched) {
        res.status(StatusCodes.BAD_REQUEST).json({ password: ErrorMessages.WRONG_PASSWORD });
        return;
      }

      const token = jwt.sign(user.toJSON(), config.tokenSecet, {
        expiresIn: config.tokenExpireTime,
      });

      res.status(StatusCodes.OK).json({ user, token });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
  }
}
