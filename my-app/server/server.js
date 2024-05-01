import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv, { config } from "dotenv";
// import routes
import testRoutes from './routes/testRoutes.js'

//dotenv config
dotenv.config();

// rest object
const app = express();

//middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//route
app.use('/api/v1',testRoutes);


app.get("/", (req, res) => {
  return res.status(200).send("<h1>Welcome to the Node server</h1>");

});
//port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () =>{
console.log(`Server Running on Port ${process.env.PORT}`);

});
