import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import UserModel from "../models/User";
import { ErrorMessages } from "../shared/enum";

export default class AuthController {
  public static async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
      const user = await UserModel.findOne({ email: email });

      if (!user) {
        res.status(500).json({ email: ErrorMessages.NO_EMAIL_FOUND });
        return;
      }

      const isPasswordMatched = await bcrypt.compare(password, user.password);

      if (!isPasswordMatched) {
        res.status(500).json({ password: ErrorMessages.WRONG_PASSWORD });
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
