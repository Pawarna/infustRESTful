import {PrismaClient} from '@prisma/client';
import { logger } from '../utils/logging/logger.js';

const prisma = new PrismaClient({});


const connectDB = async () => {
    try {
        prisma.$connect();
        logger.info('Database connected');
    } catch (error) {
        logger.error('Database fail to connect', error);
        process.exit(1);
    }
}

export {
  prisma,
  connectDB
}