import userService from "../services/userService.js";
import { CustomError } from "../utils/errors/customError.js";
import { logger } from "../utils/logging/logger.js";
import {sendSuccessResponse} from '../utils/responses/response.js';
import bcrypt from 'bcrypt';

const getUsers = async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const {orderBy, sortOrder} = req.query;
    try {
        logger.info(`Fetching users: ${req.originalUrl}`); 
        const users = await userService.getAllUsers({sortOrder, orderBy}, page, limit);
        sendSuccessResponse(res, 'Get all users successful', users, 200);
    } catch (error) {
        logger.error('Error fetching users: ', error);
        next(error)
    }
}

const getUserBy = async (req, res, next) => {
    const {value} = req.params;
    let by = 'nim';
    if (!/^\d+$/.test(value)){
        by = 'email';
    }
    try {
        logger.info(`Fething user ${req.params.value} by : ${req.user.nim}`);
        const user = await userService.getUser(by, value);
        if (!user) throw new CustomError('User not found.', 404)
        sendSuccessResponse(res, `Get user ${user.nim} successful`, user, 200);
    } catch (error) {
        next(error);
    }
}

const updateUser = async (req, res, next) => {
    const {nim} = req.params
    try {
        const existUser = await userService.getUser({by:'nim'}, nim)
        if (!existUser) throw new CustomError('User not found', 404);

        const update = {}

        if (req.body.email) {
            update.email = req.body.email;
        }
        if (req.body.password) {
            update.password = await bcrypt.hash(req.body.password, 10);
        }

        const user = await userService.updateUser(existUser.nim, update);
        sendSuccessResponse(res, `Update user ${nim} successfully`, user)
    } catch (error) {
        next(error);
    }
}

const deleteUser = async (req, res, next) => {
    const {nim} = req.user;
    try {
        await userService.deleteUser(nim);
        sendSuccessResponse(res, `Delete user ${nim} success`);
    } catch (error) {
        next(error)
    }
}

export default {
    getUsers,
    getUserBy,
    updateUser,
    deleteUser
}