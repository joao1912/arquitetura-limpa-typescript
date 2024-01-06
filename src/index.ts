import dotenv from "dotenv"
dotenv.config()

import { Server } from './server.ts';
import { ExpressAdapter } from './adapters/HTTPAdapter/ExpressAdapter.ts';
import { HTTPAdapterRepository } from './adapters/HTTPAdapter/repository/HTTPAdapterRepository.ts';

const HTTPAdapter: HTTPAdapterRepository = new ExpressAdapter()
const server = new Server(HTTPAdapter)

server.start()