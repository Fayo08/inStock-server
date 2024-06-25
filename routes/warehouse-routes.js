import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import express from "express";
const router = express.Router();

router.get("/", async (_req, res) => {
    try {
        const data = await knex("warehouses")
        res.status(200).json(data)
    } catch (e) {
        res.status(400).send(`Error retrieving warehouses: ${e}`)
    }
})

export default router;