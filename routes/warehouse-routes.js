import express from "express";
import * as warehouseController from '../controllers/warehouse-controller.js'
const router = express.Router();

router.route("/").get(warehouseController.index);

router.route("/:id").get(warehouseController.findOne);

router.route("/:id/inventories").get(warehouseController.getInventory)

export default router;
