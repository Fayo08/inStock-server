import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

// to get list of all warehouses
const index = async (_req, res) => {
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
};

// to get a specific warehouse based on id; includes all information
const findOne = async (req, res) => {
  try {
    const warehouseFound = await knex("warehouses").where({
      id: Number(req.params.id),
    });

    if (warehouseFound.length === 0) {
      return res.status(404).json({
        message: `User with ID ${req.params.id} not found`,
      });
    }
    const warehouseData = warehouseFound[0];
    res.json(warehouseData);
  } catch (e) {
    res.status(500).json({
      message: `Unable to retrieve warehouse data for warehouse with ID ${req.params.id}`,
    });
  }
};


// to get inventories for a given warehouse
const getInventory = async (req, res) => {
    try {
        const inventoryItems = await knex("warehouses")
            .join("inventories", "inventories.warehouse_id", "warehouses.id")
            .where({ warehouse_id: req.params.id }).select("inventories.id", "inventories.item_name", "inventories.category", "inventories.status", "inventories.quantity")
        
        if (inventoryItems.length === 0) {
            return res.status(404).json({
                message: `Could not find any items for warehouse with ID ${req.params.id}.`
            })
        }
        res.json(inventoryItems)
    } catch (e) {
        res.status(500).json({
            message: `Unable to retrieve inventory items for warehouse with ID ${req.params.id}: ${e}`
        })
    }
}

export {
    index,
    findOne,
    getInventory
 };
