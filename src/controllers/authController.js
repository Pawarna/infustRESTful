import authService from '../services/authService.js';
import { logger } from '../utils/logging/logger.js';
import { sendSuccessResponse } from '../utils/responses/response.js';

const register = async (req, res, next) => {
    try {
        logger.info(`Registering user : ${req.body.nim}`);
        const user = await authService.register(req)
        logger.info(`User registered with NIM: ${user.nim}`)
        sendSuccessResponse(res, 'Register successfully', user, 201)
    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    try{
        logger.info(`Login attempt: ${req.body.identifier}`)
        const {user, token} = await authService.login(req)
        delete user.password
        logger.info(`Login successful for user: ${req.body.identifier}`);
        sendSuccessResponse(res, 'Login successfully', {user,token}, 200)
    } catch (error){
        next(error);
    }
}

export default {
    register,
    login
}