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

const saveRefreshToken = async (nim, refreshToken, expiredAt) => {
    await prisma.refreshToken.create({
        data: {
            token: refreshToken,
            nim,
            expiredAt
        }
    })
}

const deleteRefreshToken = async (token) => {
    await prisma.refreshToken.delete({
        where: {
            token
        }
    })
}

const findRefreshToken = async(token) => {
    return await prisma.refreshToken.findUnique({
        where: {
            nim
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