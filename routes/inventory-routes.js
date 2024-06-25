import express from "express";
const router = express.Router();
const inventoryController = require('../controllers/inventory-controller.js');

router.post(
    '/',
    inventoryController.validateInventory,
    inventoryController.checkWarehouseExists,
    inventoryController.createInventoryItem
);

export default router;