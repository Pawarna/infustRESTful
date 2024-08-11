import {logger} from '../utils/logging/logger.js';

export const requestLogger = (req, res, next) => {
    logger.info(`Incoming Request: ${req.method} ${req.url} - ${req.ip}`)
    next()
}