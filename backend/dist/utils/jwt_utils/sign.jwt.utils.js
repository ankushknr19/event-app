"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signJwtRefreshToken = exports.signJwtAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const env_1 = require("../../config/env");
const signJwtAccessToken = (res, payload) => {
    const accessToken = jsonwebtoken_1.default.sign(payload, env_1.ACCESS_TOKEN_SECRET_KEY, {
        expiresIn: env_1.ACCESS_TOKEN_TIME_TO_LIVE,
    });
    res.cookie('accessToken', accessToken, {
        path: '/',
        maxAge: 30 * 24 * 60 * 60,
        httpOnly: true,
    });
    return accessToken;
};
exports.signJwtAccessToken = signJwtAccessToken;
const signJwtRefreshToken = (res, userId) => {
    const refreshTokenId = (0, uuid_1.v4)();
    const refreshToken = jsonwebtoken_1.default.sign({
        id: refreshTokenId,
        userId,
    }, env_1.REFRESH_TOKEN_SECRET_KEY, {
        expiresIn: env_1.REFRESH_TOKEN_TIME_TO_LIVE,
    });
    res.cookie('refreshToken', refreshToken, {
        path: '/',
        maxAge: 30 * 24 * 60 * 60,
        httpOnly: true,
    });
    return { refreshToken, refreshTokenId };
};
exports.signJwtRefreshToken = signJwtRefreshToken;
//# sourceMappingURL=sign.jwt.utils.js.map