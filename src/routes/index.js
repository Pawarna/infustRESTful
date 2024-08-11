import { Router } from "express";
import {validateLogin, validateRegister} from '../utils/validator/auth.js';
import authController from '../controllers/authController.js';
import {authVerify} from '../middlewares/authMiddleware.js';
import userController from "../controllers/userController.js";
const router = new Router();

router.post('/register', validateRegister, authController.register);
router.post('/login', validateLogin, authController.login);
router.post('/refres-token', authController.refreshToken);
router.post('/logout', authController.logout);

// user routes
router.get('/users', authVerify, userController.getUsers);

export {
    router
}

