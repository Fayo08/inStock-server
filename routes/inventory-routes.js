import express from "express";
const router = express.Router();
import {
    validateInventory,
    checkWarehouseExists,
    checkInventoryExists,
    createInventoryItem,
    updateInventoryItem
} from "../controllers/inventory-controller.js";




// create new inventory item //

router.post(
    '/',
    validateInventory,
    checkWarehouseExists,
    createInventoryItem
);

// update existing inventory item //

router.put(
    '/:id',
    validateInventory,
    checkWarehouseExists,
    checkInventoryExists,
    updateInventoryItem
);

export default router;