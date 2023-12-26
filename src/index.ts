import dotenv from 'dotenv';
import { Server } from './server';
import { ExpressAdapter } from './adapters/HTTPAdapter/ExpressAdapter';
import { HTTPAdapterRepository } from './adapters/HTTPAdapter/repository/HTTPAdapterRepository';

export const env = dotenv.config().parsed;

const HTTPAdapter: HTTPAdapterRepository = new ExpressAdapter()
const server = new Server(HTTPAdapter)

server.start()