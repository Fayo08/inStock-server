import express from "express";
const router = express.Router();
import {
    getAllInventories,
    getAllCategories,
    validateInventory,
    checkWarehouseExists,
    getSingleItem,
    checkInventoryExists,
    createInventoryItem,
    updateInventoryItem,
} from "../controllers/inventory-controller.js";

// GET /api/inventories //

router.get('/', getAllInventories);

// GET /api/inventories/categories //

router.get('/categories', getAllCategories);

// GET single inventory item //

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
