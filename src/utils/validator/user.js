import {body, validationResult} from 'express-validator';
import { prisma } from '../../config/db.js';
import {CustomError} from '../errors/customError.js';

const validateUpdateUser = [
    body('nim').optional()
        .isNumeric().withMessage('NIM must be number')
        .custom(async (value, {req}) => {
            if (!value) throw new Error('NIM is Required')

            const regex = /^20\d{2}018\d{3}$/;

            if (!regex.test(value)) {
              throw new Error('NIM is invalid');
            }

            const user = await prisma.user.findUnique({ where: {nim:value}});
            if (user && user.nim !== req.params.nim) throw new Error('User already exist')
            return true;
        }),
    body('email').optional()
        .isEmail().withMessage('Email is invalid')
        .custom(async (value, {req}) => {
            if (!value) throw new Error('Email is Required');
            const user = await prisma.user.findUnique({ where: {email:value}});
            if (user && user.nim !== req.params.nim) throw new Error('Email already used');
            return true;
        }),
    body('password').optional()
        .isLength({min:8}).withMessage('Password must be at least 8 characters long'),
    (req, res, next) => {
        const errors = validationResult(req);
    
        if (!errors.isEmpty()){
            return next(new CustomError('Validation Error', 401, errors.array()))
        }
        next()
    }
]

export {
    validateUpdateUser
}