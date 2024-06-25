import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import express from "express";
const router = express.Router();

router.get("/", async (_req, res) => {
  try {
    const data = await knex
      .select(
        "id",
        "warehouse_name",
        "address",
        "city",
        "country",
        "contact_name",
        "contact_position",
        "contact_phone",
        "contact_email"
      )
      .from("warehouses");
    res.status(200).json(data);
  } catch (e) {
    res.status(400).send(`Error retrieving warehouses: ${e}`);
  }
});

router.get("/:id", async (req, res) => {
    try {
        const warehouseFound = await knex("warehouses").where({ id: Number(req.params.id) });

        if (warehouseFound.length === 0) {
            return res.status(404).json({
                message: `User with ID ${req.params.id} not found`
            })
        }
        const warehouseData = warehouseFound[0];
        res.json(warehouseData)
    } catch (e) {
        res.status(500).json({
            message: `Unable to retrieve warehouse data for warehouse with ID ${req.params.id}`
        })
    }
})

export default router;
