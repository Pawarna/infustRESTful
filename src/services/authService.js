import { prisma } from "../config/db.js";
import bcrypt from 'bcrypt';


const register = async (nim, email, password, refreshToken) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await prisma.user.create({
        data: {
            nim,
            email,
            password: hashedPassword
        },
        select: {
            nim: true,
            email: true,
            createdAt: true
        }
    })
}

const findIndetifier = async (identifier) => {
    return await prisma.user.findFirst({
        where: {
            OR: [
                {nim: identifier},
                {email: identifier}
            ]
        },
        select: {
            nim: true,
            email: true,
            password: true,
        }
    });
}

const saveRefreshToken = async (nim, refreshToken, deviceInfo, expiredAt) => {
    await prisma.refreshToken.deleteMany({
        where: {
            nim,
            ipAddress: deviceInfo.ipAddress,
            userAgent: deviceInfo.userAgent
        }
    });

    // Simpan token refresh yang baru
    await prisma.refreshToken.create({
        data: {
            token: refreshToken,
            nim,
            expiredAt,
            ...deviceInfo
        }
    });
}

const deleteRefreshToken = async (token) => {
    await prisma.refreshToken.deleteMany({
        where: {
            token
        }
    })
}

const findRefreshToken = async(token) => {
    return await prisma.refreshToken.findUnique({
        where: {
            token
        },
        include: {
            user: true
        }
    })
}

export default {
    register,
    findIndetifier,
    saveRefreshToken,
    deleteRefreshToken,
    findRefreshToken
}