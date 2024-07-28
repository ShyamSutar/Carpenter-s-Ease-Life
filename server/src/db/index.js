import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`mongodb://localhost:27017/carpenter`);
        console.log(`${process.env.MONGODB_URI}/${DB_NAME}`);   
        // const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MongoDb connected !! DB Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("MongoDb connection Failed: ",error);
        process.exit(1)
    }
}

export default connectDB;