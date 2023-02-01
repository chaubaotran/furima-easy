import { Router } from "express";

import PurchaseController from "../controllers/purchase.controller";

const router = Router();

router.get("/", PurchaseController.getPurchasesByUserId);
router.post("/", PurchaseController.createPurchase);

export default router;
