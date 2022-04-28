import mongoose from "mongoose";
import { config } from "../config";

const URI = `mongodb+srv://${config.mongo?.user}:${config.mongo?.password}@${config.mongo?.host}/${config.mongo?.name}`;

export const dbConnection = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Connection established with the database");
    } catch (error) {
        console.error(error);
        throw new Error("Database connection error");
    }
};