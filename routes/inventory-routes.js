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

// get single inventory item
router.get("/api/inventories/:id", getSingleItem);

// GET /api/inventories //

router.get('/api/inventories', getAllInventories);

// GET /api/inventories/categories //

router.get('/api/inventories/categories', getAllCategories);

// create new inventory item //

router.post("/api/inventories", validateInventory, checkWarehouseExists, createInventoryItem);

// update existing inventory item //

router.put(
  "/api/inventories/:id",
  validateInventory,
  checkWarehouseExists,
  checkInventoryExists,
  updateInventoryItem
);

export default router;
