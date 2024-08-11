import userService from "../services/userService.js";
import { logger } from "../utils/logging/logger.js";
import {sendSuccessResponse} from '../utils/responses/response.js';

const getUsers = async (req, res, next) => {
    try {
        logger.info(`Fetching users: ${req.originalUrl}`); 
        const {users, pagination} = await userService.getUsers(req);
        sendSuccessResponse(res, 'Get all users successful', {users, pagination}, 200);
    } catch (error) {
        logger.error('Error fetching users: ', error);
        next(error)
    }
}

export default {
    getUsers
}