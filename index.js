import express from "express";
import cors from "cors";
import warehouseRoutes from "./routes/warehouse-routes.js";
import inventoryRoutes from "./routes/inventory-routes.js";

const app = express();

app.use (cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.use('/api/warehouse', warehouseRoutes);

app.use('/api/inventories', inventoryRoutes);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})