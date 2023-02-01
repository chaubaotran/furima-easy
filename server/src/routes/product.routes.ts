import { Router } from "express";

import ProductController from "../controllers/product.controller";

const router = Router();

router.get("/", ProductController.getProductByUserId);
router.get("/:id", ProductController.getProductById);
router.post("/", ProductController.createProduct);

export default router;
