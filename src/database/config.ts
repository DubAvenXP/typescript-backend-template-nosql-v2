import mongoose from "mongoose";
import { config } from '../../config';

const { host, name, password, user } = config.mongo;

let URI: string;

config.env === 'production' ?
    URI = `mongodb+srv://${user}:${password}@${host}/${name}` :
    URI = `mongodb://${user}:${password}@${host}/${name}`;

export const dbConnection = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Connection established with the database");
    } catch (error) {
        console.error(error);
        throw new Error("Database connection error");
    }
};
