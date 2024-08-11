import {CustomError} from '../utils/errors/customError.js';
import {prisma} from '../config/db.js';
import { logger } from '../utils/logging/logger.js';
import jwt from '../utils/token/jwt.js';

const authVerify = async (req, res, next) => {
    try {
        const token = req.headers['authorization']
        if (!token) throw new CustomError('Access denied. No token provided', 401);
        const user = jwt.verifyAccessToken(token);
        if (!user) throw new CustomError('User not found', 401);
        req.user = user;
        next();
    } catch (error) {
        logger.error(error);
        next(error)
    }
}

export{
    authVerify
}