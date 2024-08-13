import {prisma} from '../config/db.js';

const getUsers = async(req) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
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
            nim: 'asc'
        }
    });

    const totalPages = Math.ceil(totalUsers / limit)
    const pagination = {
        totalPages,
        totalUsers,
        currentPage: page,
        perPage: limit
    }
    return { 
        users, pagination
    }
}

export default {
    getUsers
}