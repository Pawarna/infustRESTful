import {CustomError} from '../utils/errors/customError.js';
import {prisma} from '../config/db.js';
import { logger } from '../utils/logging/logger.js';
import jwt from '../utils/token/jwt.js';

const authVerify = async (req, res, next) => {
    try {
        const token = req.headers['authorization']
        if (!token) throw new CustomError('Access denied. No token provided', 401);
        const user = jwt.verifyAccessToken(token);
        if (!user) throw new CustomError('Invalid or expired token', 401);
        const existingUser = await prisma.user.findUnique({ where: { nim: user.nim } });
        if (!existingUser) throw new CustomError('User not found', 404);
        
        req.user = existingUser;
        next();
    } catch (error) {
        logger.error(error);
        next(error)
    }
}

export{
    authVerify
}