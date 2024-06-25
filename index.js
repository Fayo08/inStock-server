import express from "express";
import cors from "cors";


const app = express();

app.use (cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.get('/', (_req, res) => {
    res.send('Hello World');
});


app.listen (PORT, ()=>{})