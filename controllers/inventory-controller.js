import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const getAllInventories = async (req, res) => {
    try {
        const inventories = await knex ('inventories')
            .join('warehouses', 'inventories.warehouse_id', 'warehouses.id')
            .select(
                'inventories.id',
                'warehouses.warehouse_name',
                'inventories.item_name',
                'inventories.description',
                'inventories.category',
                'inventories.status',
                'inventories.quantity'
            );
        
        res.status(200).json(inventories);
    } catch (error) {
        console.error('Error fetching inventories:', error);
        res.status(500).json({error: 'Failed to fetch inventories.'});
    }
};

const getAllCategories = async (req, res) => {
    try {
        const categories = await knex('inventories')
            .distinct('category')
            .select('category');

        res.status(200).json(categories.map(c => c.category));
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({error: 'Failed to fetch categories'});
    }
};

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

const checkInventoryExists = async (req, res, next) => {
    const {id} = req.body;
    const inventory = await knex('inventories').where({id}).first();

    if (!inventory) {
        return res.status(404).json({error: 'Inventory item not found.'});
    }

    next();
}

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

const updateInventoryItem = async (req, res) => {
    try {
        const {id} = req.params;
        const {warehouse_id, item_name, description, category, status, quantity} = req.body;

        await knex('inventories')
            .where({id})
            .update({
                warehouse_id,
                item_name,
                description,
                category,
                status,
                quantity
            });
        
        const updatedInventoryItem = await knex('inventories').where({id}).first();

        res.status(200).json(updateInventoryItem);
    } catch (error) {
        res.status(500).json({error: 'Failed to update inventory item.'});
    }
};

export {
    getAllInventories,
    getAllCategories,
    validateInventory,
    checkWarehouseExists,
    checkInventoryExists,
    createInventoryItem,
    updateInventoryItem
};