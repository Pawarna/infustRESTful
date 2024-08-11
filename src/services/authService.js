import { validationResult } from "express-validator"
import { prisma } from "../config/db.js";
import bcrypt from 'bcrypt';
import { CustomError } from "../utils/errors/customError.js";
import jwt from "jsonwebtoken";

const register = async (req) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()){
        throw new CustomError('Validation Error', 400, errors.array())
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    return await prisma.user.create({
        data: {
            nim: req.body.nim,
            email: req.body.email,
            password: hashedPassword
        },
        select: {
            nim: true,
            email: true,
            createAt: true
        }
    })
}

const login = async (req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        throw new CustomError('Validation Error', 401, errors.array());
    }

    const user = await prisma.user.findFirst({
        where: {
            OR: [
                {nim: req.body.identifier},
                {email: req.body.identifier}
            ]
        },
        select: {
            nim: true,
            email: true,
            password: true,
        }
    });

    if (!user || !(await bcrypt.compare(req.body.password, user.password))){
        throw new CustomError('User or password invalid', 401)
    }

    const token = jwt.sign({nim: user.nim}, process.env.JWT_SECRET, {expiresIn: '1h'});
    return {user, token}
}

export default {
    register,
    login
}