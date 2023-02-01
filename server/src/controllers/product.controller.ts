import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import ProductModel from "../models/Product";
import { ErrorMessages } from "../shared/enum";

export default class ProductController {
  public static async createProduct(
    req: Request,
    res: Response
  ): Promise<void> {
    const { product, userId } = req.body;

    if (!userId || !product.name) {
      res.status(StatusCodes.BAD_REQUEST).send(ErrorMessages.BAD_REQUEST);
      return;
    }

    try {
      const productAlreadyExists = await ProductModel.findOne({
        name: product.name,
      });

      if (productAlreadyExists) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ name: ErrorMessages.USED_PRODUCT_NAME });
        return;
      }

      const createdProduct = await ProductModel.create({ ...product, userId });

      res.status(StatusCodes.CREATED).json(createdProduct);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  public static async getProductByUserId(
    req: Request,
    res: Response
  ): Promise<void> {
    const userId = req.query.userId;

    if (!userId) {
      res.status(StatusCodes.BAD_REQUEST).send(ErrorMessages.BAD_REQUEST);
      return;
    }

    try {
      const products = await ProductModel.find({ userId });

      res.status(StatusCodes.OK).json(products);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  public static async getProductById(req: Request, res: Response): Promise<void> {
    const id = req.params.id;

    if (!id) {
      res.status(StatusCodes.BAD_REQUEST).send(ErrorMessages.BAD_REQUEST);
      return;
    }

    try {
      const product = await ProductModel.findById(id);

      res.status(StatusCodes.OK).json(product);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
  }
}
