import {body, validationResult} from 'express-validator';
import {CustomError} from '../errors/customError.js';

const validateTask = [
    body('title')
        .notEmpty().withMessage("Title can't be empty")
        .isLength({max:50}).withMessage('Title max length is 50 characters')
        .isString(),
    body('description')
        .optional().isString(),
    body('course')
        .notEmpty().withMessage('Course is required').isString(),
    body('dueDate')
        .isISO8601().withMessage('Please provide a valid date in ISO 8601 format (YYYY-MM-DD or YYYY-MM-DDTHH:MM:SSZ).'),
    body('classOf')
        .notEmpty().withMessage("Class Of is required")
        .isNumeric(),
    body('submittedTo')
        .isString().optional()
        .isIn(['Sipedar', 'Google Form', 'Presentation', 'Hardfile']).withMessage("Submitted To mush contect of 'Sipedar', 'Google Form', 'Presentation', 'Hardfile'."),
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) throw new CustomError(req, 400, errors.array());
            next();
        } catch (error) {
            next(error);
        }
    }

]

const validateTaskUpdate = [
    body('title')
        .optional()
        .isLength({max:50}).withMessage('Title max length is 50 characters')
        .isString(),
    body('description')
        .optional().isString(),
    body('course')
        .optional().isString(),
    body('dueDate')
        .optional().isISO8601().withMessage('Please provide a valid date in ISO 8601 format (YYYY-MM-DD or YYYY-MM-DDTHH:MM:SSZ).'),
    body('classOf')
        .optional()
        .isNumeric(),
    body('submittedTo')
        .isString().optional()
        .isIn(['Sipedar', 'Google Form', 'Presentation', 'Hardfile']).withMessage("Submitted To mush contect of 'Sipedar', 'Google Form', 'Presentation', 'Hardfile'."),
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) throw new CustomError(req, 400, errors.array());
            next();
        } catch (error) {
            next(error);
        }
    }

]

export { validateTask, validateTaskUpdate }