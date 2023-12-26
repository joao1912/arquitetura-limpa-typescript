import dotenv from 'dotenv';
dotenv.config();
import { Server } from './server';
import { ExpressAdapter } from './adapters/HTTPAdapter/ExpressAdapter';
import { HTTPAdapterRepository } from './adapters/HTTPAdapter/repository/HTTPAdapterRepository';

const HTTPAdapter: HTTPAdapterRepository = new ExpressAdapter()
const server = new Server(HTTPAdapter)

server.start()


