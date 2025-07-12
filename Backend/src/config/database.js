import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async ()=>{

    try{

        const connection = await mongoose.connect(config.MONGO_URI)
        console.log(`MongoDb connected : ${connection.connection.host} `)

    } catch(error){

        console.log(`Error: ${error.message}`);
        process.exit(1);
    }

}
export default connectDB;