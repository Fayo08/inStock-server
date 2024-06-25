import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const validateInventory = (req, res, next) => {
    const {warehouse_id, item_name, description, category, status, quantity} = req.body;

    if (!warehouse_id || !item_name || !description || !category || !status || quantity === undefined) {
        return res.status(400).json({error: 'All fields are required.'});
    }

    if (isNaN(quantity)) {
        return res.status(400).json({error: 'Quantity must be a number.'})
    }

    next();
};

const checkWarehouseExists = async (req, res, next) => {
    const {warehouse_id} = req.body;
    const warehouse = await knex('warehouses').where({id: warehouse_id}).first();

    if (!warehouse) {
        return res.status(400).json({error: 'Warehouse does not exist.'});
    }

    next();
};

const createInventoryItem = async (req, res) => {
    try {
        const {warehouse_id, item_name, description, category, status, quantity} = req.body;

        const [id] = await knex('inventories').insert({
            warehouse_id,
            item_name,
            description,
            category,
            status,
            quantity
        });

        const newInventoryItem = await knex('inventories').where({id}).first();

        res.status(201).json(newInventoryItem);
    } catch (error) {
        res.status(500).json({error: 'Failed to create inventory item.'});
    }
};

export {
    validateInventory,
    checkWarehouseExists,
    createInventoryItem,
};