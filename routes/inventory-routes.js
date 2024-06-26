import express from "express";
const router = express.Router();
import {
  validateInventory,
  checkWarehouseExists,
  getSingleItem,
  checkInventoryExists,
  createInventoryItem,
  updateInventoryItem,
} from "../controllers/inventory-controller.js";

// get single inventory item
router.get("/:id", getSingleItem);

// create new inventory item //

router.post("/", validateInventory, checkWarehouseExists, createInventoryItem);

// update existing inventory item //

router.put(
  "/:id",
  validateInventory,
  checkWarehouseExists,
  checkInventoryExists,
  updateInventoryItem
);

export default router;
