import dotenv from 'dotenv';
dotenv.config();

import Server from './api/Server';
const server = new Server();

server.listen();