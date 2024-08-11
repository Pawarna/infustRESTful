import './config/env.js';
import {app} from './app.js';
import { connectDB } from './config/db.js';
import { logger } from './utils/logging/logger.js';

const PORT = process.env.PORT
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            logger.info(`Server running on port ${PORT}`);
        })
    } catch (error) {
        logger.error('Failed to start server', error.message)
        process.exit(1)
    }
}

startServer();