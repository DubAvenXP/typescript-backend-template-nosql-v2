import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import { config } from "../config";
import { Paths } from "../interfaces";
import { dbConnection } from "../database/config";

class Server {
    private app: Application;
    private port: string;
    private paths: Paths;

    constructor() {
        this.app = express();
        this.port = config.port || "8000";
        this.paths = {
            users: "/api/v1/users",
            auth: "/api/v1/auth",
            messages: "/api/v1/messages",
            clients: "/api/v1/clients",
        };

        this.connectDB();
        this.middlewares();
        this.routes();
    }

    async connectDB() {
        try {
            dbConnection();
        } catch (error) {
            console.error(error);
        }
    }

    middlewares() {
        this.app.use(
            cors({
                origin: "*",
            })
        );
        this.app.use(express.json());
        this.app.use(helmet());
    }

    routes() {
        this.app.use(this.paths.users, require("../api/users/routes"));
        this.app.use(this.paths.auth, require("../api/auth/routes"));
        this.app.use(this.paths.messages, require("../api/messages/routes"));
        this.app.use(this.paths.clients, require("../api/clients/routes"));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Application running on http://localhost:${this.port}`);
        });
    }
}

export default Server;
