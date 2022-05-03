import dotenv from 'dotenv';
dotenv.config();

import Server from './src/api/Server';
const server = new Server();

server.listen();