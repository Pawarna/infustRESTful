import jwt from "jsonwebtoken";
import { logger } from "../utils/logging/logger.js";

export const errorMiddleware = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';

    logger.error(err);
    if (err.name === 'Validation Error'){
        statusCode = 400;
        message = 'Validation Error'
    } else if (err instanceof jwt.JsonWebTokenError){
        statusCode = 401;
    }
    

    res.status(statusCode).json({
        status: 'error',
        message,
        errors: err.errors
    })
}