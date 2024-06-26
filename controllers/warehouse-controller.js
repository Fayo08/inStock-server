import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const validateWarehouse = (req, res, next) => {
  const {
    warehouse_name,
    address,
    city,
    country,
    contact_name,
    contact_position,
    contact_phone,
    contact_email,
  } = req.body;
    
    if (!warehouse_name || !address || !city || !country || !contact_name || !contact_position || !contact_phone || !contact_email) {
        return res.status(400).json({error: 'All fields are required.'})
    }

    next();
};



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
      .where({ warehouse_id: req.params.id })
      .select(
        "inventories.id",
        "inventories.item_name",
        "inventories.category",
        "inventories.status",
        "inventories.quantity"
      );

    if (inventoryItems.length === 0) {
      return res.status(404).json({
        message: `Could not find any items for warehouse with ID ${req.params.id}.`,
      });
    }
    res.status(200).json(inventoryItems);
  } catch (e) {
    res.status(500).json({
      message: `Unable to retrieve inventory items for warehouse with ID ${req.params.id}: ${e}`,
    });
  }
};


const createNewWarehouse = async (req, res) => {

  console.log('Request Body:', req.body);


  if (!req.body.contact_phone || req.body.contact_phone.length !== 10) {
    return res.status(400).json({
      message: "Please provide a valid phone number",
    });
  }

  if (!req.body.contact_email || !req.body.contact_email.includes('@') ) {
    return res.status(400).json({
      message: "Please provide a valid email address",
    });
  }

  try {
  
      const {warehouse_name, address, city, country, contact_name, contact_position, contact_phone, contact_email } = req.body;

      const [id] = await knex('warehouses').insert({
          warehouse_name,
          address,
          city,
          country,
          contact_name,
          contact_position,
          contact_phone,
          contact_email
      });

      const newWarehouse = await knex('warehouses').where({id}).first();

      res.status(201).json(newWarehouse);
  } catch (error) {
      res.status(500).json({error: 'Failed to  create new warehouse.'});
  }
};


const updateWarehouse = async (req, res) => {
    try {
        const { id } = req.params;
        const { warehouse_name, address, city, country, contact_name, contact_position, contact_phone, contact_email } = req.body

        const warehouse = await knex("warehouses").where({ id: req.params.id }).first();
        if (!warehouse) {
            return res.status(404).json({error: "Warehouse does not exist"})
        }
        
        await knex('warehouses')
            .where({ id })
            .update({
                warehouse_name,
                address,
                city,
                country,
                contact_name,
                contact_position,
                contact_phone,
                contact_email
            })
        const updatedWarehouse = await knex('warehouses').where({ id: req.params.id })
        res.status(200).json(updatedWarehouse[0])
    } catch (e) {
        res.status(500).json({error: 'Failed to update warehouse'})
    }
    
}

export { validateWarehouse, index, findOne, getInventory, updateWarehouse, createNewWarehouse  };
