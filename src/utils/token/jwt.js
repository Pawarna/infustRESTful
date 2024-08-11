import jwt from 'jsonwebtoken';

const accessTokenLife = '15m';
const refreshTokenLife = '7d';

const generateAccessToken = (user) => {
    return jwt.sign({nim: user.nim}, process.env.ACCESS_TOKEN, {expiresIn: accessTokenLife});
}

const generateRefreshToken = (user) => {
    return jwt.sign({nim: user.nim}, process.env.REFRESH_TOKEN, {expiresIn: refreshTokenLife});
}

const verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.ACCESS_TOKEN);
}

const verifyRefreshToken = (token) => {
    return jwt.verify(token, process.env.REFRESH_TOKEN);
}

export default {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
}