import express from 'express';
import { UserController } from '../controllers/UserController';
import { AuthJwt } from '../../adapters/authenticatorAdapter/AuthJwt';
const authJwt = new AuthJwt()

const router = express.Router();
const userController = new UserController();

router.get('/', authJwt.auth ,userController.getUsers);

export default router;