import { Request, Response } from "express";

import UserModel from "../models/User";
import { ErrorMessages } from "../shared/enum";

export default class UserController {
  public static async createUser(req: Request, res: Response): Promise<void> {
    const user = req.body;

    const userAlreadyExists = await UserModel.findOne({ email: user.email });

    if (userAlreadyExists) {
      res.status(500).json({ email: ErrorMessages.USED_EMAIL });
      return;
    }

    try {
      const createdUser = await UserModel.create(user);
      res.status(201).json(createdUser);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
