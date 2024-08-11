import jwt from 'jsonwebtoken';
import {CustomError} from '../utils/errors/customError.js';
import {prisma} from '../config/db.js';
import { logger } from '../utils/logging/logger.js';
import {sendErrorResponse} from '../utils/responses/response.js';

const authVerify = async (req, res, next) => {
    const token = req.headers['authorization'].replace('Bearer ', '');
    if (!token) throw new CustomError('Access denied. No token provided', 401);
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findFirst({ where: {nim:decoded.nim }});

        if (!user) throw new CustomError('User not found', 401);
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}