import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Types } from "mongoose";

import { Purchase } from "../interface/Purchase";
import ItemModel from "../models/Item";
import PurchaseModel from "../models/Purchase";

import { ErrorMessages } from "../shared/enum";

export default class PurchaseController {
  public static async createPurchase(
    req: Request,
    res: Response
  ): Promise<void> {
    const { items, userId, datetime, total, currency } = req.body as Purchase;

    if (
      !items ||
      !items.length ||
      !userId ||
      !datetime ||
      !total ||
      !currency
    ) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send({ error: ErrorMessages.BAD_REQUEST });
      return;
    }

    const itemIdList: Types.ObjectId[] = [];

    try {
      items.forEach(async (item) => {
        const _id = new Types.ObjectId();
        const createItem = new ItemModel({ _id, ...item });
        createItem.save()
        itemIdList.push(_id);
      });
      
      const createdPurchase = await PurchaseModel.create({
        userId,
        datetime,
        total,
        currency,
        items: itemIdList,
      });

      res.status(StatusCodes.CREATED).json(createdPurchase);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  public static async getPurchasesByUserId(
    req: Request,
    res: Response
  ): Promise<void> {
    const userId = req.query.userId;

    if (!userId) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send({ error: ErrorMessages.BAD_REQUEST });
      return;
    }

    try {
      const purchases = await PurchaseModel.find({ userId });

      res.status(StatusCodes.OK).json(purchases);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
  }
}
