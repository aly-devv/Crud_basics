import  config  from "./src/config/config.js";
import express from "express"
import connectDB from "./src/config/database.js";
import userRoutes from "./src/routes/userRoutes.js";
import cors from 'cors'
const app = express();
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
connectDB();

app.use('/api/users' , userRoutes);

app.listen(config.port, ()=>{
    console.log(`Server running on port ${config.port}`)
 
});

