import { Router } from "express";
import {validateLogin, validateRegister} from '../utils/validator/auth.js';
import authController from '../controllers/authController.js';
import {authVerify} from '../middlewares/authMiddleware.js';
import userController from "../controllers/userController.js";
import {validateUpdateUser} from '../utils/validator/user.js';
import { validateStudent } from "../utils/validator/student.js";
import studentController from "../controllers/studentController.js";
const router = new Router();

router.post('/register', validateRegister, authController.register);
router.post('/login', validateLogin, authController.login);
router.post('/refresh-token', authController.refreshToken);
router.post('/logout', authController.logout);

// user routes
router.get('/users', authVerify, userController.getUsers);
router.get('/users/:value', authVerify, userController.getUserBy);
router.patch('/users/:nim', authVerify, validateUpdateUser, userController.updateUser);
router.delete('/users/:nim', authVerify, userController.deleteUser);

// student routes
router.post('/students', authVerify, validateStudent, studentController.createStudent);
router.get('/students', authVerify, studentController.getStudents);
router.get('/students/:nim', authVerify, studentController.getStudentBy);
router.patch('/students/:nim', authVerify, validateStudent, studentController.updateStudent);

export {
    router
}

