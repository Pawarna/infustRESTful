import {body, validationResult} from 'express-validator';
import { prisma } from '../../config/db.js';
import {CustomError} from '../errors/customError.js';

const validateStudent = [
    body('nim').optional()
        .isNumeric().withMessage('NIM must be number')
        .custom(async (value, {req}) => {
            const regex = /^20\d{2}018\d{3}$/;
            if (!regex.test(value)) {
            throw new CustomError('NIM is invalid');
            }

            const user = await prisma.user.findUnique({ where: {nim:value}});
            if (user && user.nim !== req.params.nim) throw new CustomError('NIM already used')
            return true;
    }),
    body('name')
        .optional()
        .isLength({max:50}).withMessage('Name is too long, max length is 50'),
    body('birthdayPlace')
        .optional()
        .isLength({max:100}).withMessage('Birthday place is too long, max length is 100 characters'),
    body('birthday')
        .optional()
        .isDate({ format: 'YYYY-MM-DD' })
        .withMessage('Tanggal harus dalam format YYYY-MM-DD')
        .custom((value) => {
        const date = new Date(value);
        if (isNaN(date.getTime())) {
            throw new CustomError('Tanggal tidak valid', 400);
        }
        return true;
        }),
    body('religion')
        .optional()
        .isLength({max:10}).withMessage('Religion is too long, max length is 10 characters'),
    body('gender')
        .optional()
        .isIn(['male', 'female']).withMessage('Gender must be either "male" or "female"'),
    body('class')
        .optional()
        .isLength({max:1}).withMessage('Class max length is 1')
        .isIn(['A','B','C']).withMessage('Invalid class, must be either "A", "B", "C"'),
    body('motto')
        .optional()
        .isLength({max:255}).withMessage("Motto is too long, max length is 255 characters"),
    body('badges').optional()
        .isIn(['princeOfInformatics','princessOfInformatics','student','admin']),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) next(new CustomError('Validation Error', 400, errors.array()))
        next();
    }
]

export {
    validateStudent
}