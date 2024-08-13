import authService from '../services/authService.js';
import { logger } from '../utils/logging/logger.js';
import { sendSuccessResponse } from '../utils/responses/response.js';
import jwt from '../utils/token/jwt.js';
import bcrypt from 'bcrypt';
import {CustomError} from '../utils/errors/customError.js';
import {getDeviceInfo} from '../utils/device/info.js'


const register = async (req, res, next) => {
    const {nim, email, password} = req.body
    try {
        logger.info(`Registering user : ${nim}`);

        const user = await authService.register(nim, email, password)
        const accessToken = jwt.generateAccessToken(user);
        const refreshToken = jwt.generateRefreshToken(user);
        const deviceInfo = getDeviceInfo(req);

        await authService.saveRefreshToken(nim, refreshToken, deviceInfo, new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))

        logger.info(`User registered with NIM: ${user.nim}`)
        sendSuccessResponse(res, 'Register successfully', {user, accessToken, refreshToken}, 201)
    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    const {identifier, password} = req.body
    try{
        logger.info(`Login attempt: ${req.body.identifier}`);

        const user = await authService.findIndetifier(identifier);

        if (!user || !(await bcrypt.compare(password, user.password))){
            throw new CustomError('Invalid user or password', 401)
        }

        const deviceInfo = getDeviceInfo(req);

        const accessToken = jwt.generateAccessToken(user);
        const refreshToken = jwt.generateRefreshToken(user);
        await authService.saveRefreshToken(user.nim, refreshToken, deviceInfo, new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))
        
        delete user.password

        logger.info(`Login successful for user: ${req.body.identifier}`);
        sendSuccessResponse(res, 'Login successfully', {user, accessToken, refreshToken}, 200)
    } catch (error){
        next(error);
    }
}

const refreshToken = async (req, res, next) => {
    const {token} = req.body
    if (!token) {
        return next(CustomError('Refresh token is required', 403))
    }
    try {
        const storedToken = await authService.findRefreshToken(token);
        if (!storedToken) throw new CustomError('Invalid refresh token', 403);
        
        const user = jwt.verifyRefreshToken(token);
        const newAccessToken = jwt.generateAccessToken(user);

        sendSuccessResponse(res, 'Token refreshed successfully', {accessToken: newAccessToken}, 200);
    } catch (error) {
        await authService.deleteRefreshToken(token)
        next(new CustomError('Invalid or expired refresh token', 403));
    }
}

const logout = async (req, res, next) => {
    const {token} = req.body
    try {
        await authService.deleteRefreshToken(token);
        sendSuccessResponse(res, 'Logout successfully', {statusCode: 200});
    } catch (error) {
        next(error);
    }
}

export default {
    register,
    login,
    refreshToken,
    logout
}