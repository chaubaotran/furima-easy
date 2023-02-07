import { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';

import UserModel from "../models/User";
import { ErrorMessages } from "../shared/enum";

export default class UserController {
  public static async createUser(req: Request, res: Response): Promise<void> {
    const user = req.body;

    try {
      const userAlreadyExists = await UserModel.findOne({ email: user.email });

      if (userAlreadyExists) {
        res.status(StatusCodes.BAD_REQUEST).json({ email: ErrorMessages.USED_EMAIL });
        return;
      }

      const createdUser = await UserModel.create(user);
      
      res.status(StatusCodes.CREATED).json(createdUser);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  public static async editUser(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const user = req.body;

    if (!id || !user) {
      res.status(StatusCodes.BAD_REQUEST).json({ email: ErrorMessages.BAD_REQUEST });
      return;
    }

    console.log('id', id);
    console.log('user', user);

    try {
      const userAlreadyExists = await UserModel.findById(id);

      if (!userAlreadyExists) {
        res.status(StatusCodes.BAD_REQUEST).json({ email: ErrorMessages.BAD_REQUEST });
        return;
      }

      userAlreadyExists.name = user.name;
      userAlreadyExists.email = user.email;

      const updatedUser = userAlreadyExists.save();
      
      res.status(StatusCodes.OK).json(updatedUser);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
  }
}
