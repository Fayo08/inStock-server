import express from "express";
import * as warehouseController from "../controllers/warehouse-controller.js";
const router = express.Router();
import { validateWarehouse } from "../controllers/warehouse-controller.js";
import {createNewWarehouse} from "../controllers/warehouse-controller.js"

router.route("/").get(warehouseController.index);


router.route("/").post(warehouseController.createNewWarehouse);

router.route("/:id")
  .get(warehouseController.findOne)

router.route("/:id").put(validateWarehouse, warehouseController.updateWarehouse);

router.route("/:id/inventories").get(warehouseController.getInventory);

export default router;
