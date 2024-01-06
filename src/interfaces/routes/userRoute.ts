import {Router} from 'express';
import { UserController } from '../controllers/UserController.ts';
import { AuthJwt } from '../../adapters/authenticatorAdapter/AuthJwt.ts';
const authJwt = new AuthJwt()

const router = Router();
const userController = new UserController();

router.get('/', authJwt.auth ,userController.getUsers);

router.post('/add', userController.createUser)

export default router;