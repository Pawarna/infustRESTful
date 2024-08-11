import {body, validationResult} from 'express-validator';
import {prisma} from '../../config/db.js';
import { CustomError } from '../errors/customError.js';


const validateRegister = [
    body('nim')
        .isNumeric().withMessage('NIM must be number')
        .custom(async (value) => {
            if (!value) throw new Error('NIM is Required')

            const regex = /^20\d{2}018\d{3}$/;

            if (!regex.test(value)) {
              throw new Error('NIM is invalid');
            }

            const user = await prisma.user.findUnique({ where: {nim:value}});
            if (user) throw new Error('User already exist')
            return true;
        }),
    body('email')
        .isEmail().withMessage('Email is invalid')
        .custom(async (value) => {
            if (!value) throw new Error('Email is Required');
            const user = await prisma.user.findUnique({ where: {email:value}});
            if (user) throw new Error('Email already used');
            return true;
        }),
    body('password')
        .isLength({min:8}).withMessage('Password must be at least 8 characters long'),
];

const validateLogin = [
    body('identifier').notEmpty().withMessage('NIM or Email required'),
    body('password').notEmpty().withMessage('Password required'),
];

export {
    validateRegister,
    validateLogin
}