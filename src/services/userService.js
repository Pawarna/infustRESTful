import {prisma} from '../config/db.js';
import {CustomError} from '../utils/errors/customError.js';

const getAllUsers = async({orderBy = 'nim', sortOrder = 'asc'} = {}, page = 1, limit = 10) => {
    const validSortOder = ['asc', 'desc'];
    if (!validSortOder.includes(sortOrder.toLowerCase())) {
        throw new CustomError("Invalid sort order. Allowed values are 'asc' or 'desc'.", 400);
    }
    const validOrderBy = ['nim', 'email', 'createdAt', 'updatedAt'];
    if (!validOrderBy.includes(orderBy)){
        throw new CustomError("Invalid order by. Allowed values are 'nim', 'email', 'createdAt', 'updatedAt'.", 400);
    }

    const skip = (page - 1) * limit;
    const totalUsers = await prisma.user.count()

    const users = await prisma.user.findMany({
        skip,
        take: limit,
        select: {
            nim: true,
            email: true,
            createdAt: true,
            updatedAt: true
        },
        orderBy: {
            [orderBy]: sortOrder
        }
    });

    const totalPages = Math.ceil(totalUsers / limit)
    const pagination = {
        totalPages,
        totalUsers,
        currentPage: page,
        perPage: limit
    }
    return {users, pagination};
}

const getUser = async({by = 'nim'} = {}, value) => {
    const validBy = ['nim', 'email'];
    if(!validBy.includes(by)) throw new CustomError("Invalid params 'by'. Allowed value is 'nim', 'email'.", 400);

    const user = await prisma.user.findFirst({
        where: {
            [by]: value,
        }
    });

    return user;
}

const updateUser = async (nim, data) => {
    const user = await prisma.user.update({
        where: {
            nim
        },
        data: data,
        select: {
            nim: true,
            email: true,
            createdAt: true,
            updatedAt: true
        }
    })

    return user;
}

const deleteUser = async (nim) => {
    const countUser = await prisma.user.findFirst({
        where: {
            nim
        }
    })

    if (!countUser) throw new CustomError('User not found', 404);
    
    await prisma.user.delete({
        where: {
            email: countUser.email
        }
    })
}

export default {
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
}