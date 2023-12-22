import dotenv from 'dotenv';
import { Server } from './server';
import { ExpressAdapter } from './adapters/HTTPAdapter/ExpressAdapter';
import userRoute from "./interfaces/routes/userRoute"

dotenv.config();

const HTTPAdapter = new ExpressAdapter()
const server = new Server(HTTPAdapter)

HTTPAdapter.useRoute('/user', userRoute)

server.start()