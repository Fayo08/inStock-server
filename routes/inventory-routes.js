import express from "express";
const router = express.Router();
const inventoryController = require('../controllers/inventory-controller.js');

// create new inventory item //

router.post(
    '/',
    inventoryController.validateInventory,
    inventoryController.checkWarehouseExists,
    inventoryController.createInventoryItem
);

export default router;