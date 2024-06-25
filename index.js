import express from "express";
import cors from "cors";
import warehouseRoutes from "./routes/warehouse-routes.js"

const app = express();

app.use (cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.use('/warehouse', warehouseRoutes)

app.get('/', (_req, res) => {
    res.send('Hello World');
});


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})