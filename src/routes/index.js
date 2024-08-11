import { Router } from "express";
import {validateLogin, validateRegister} from '../utils/validator/auth.js';
import authController from '../controllers/authController.js';
const router = new Router();

router.post('/register', validateRegister, authController.register);
router.post('/login', validateLogin, authController.login);

export {
    router
}

