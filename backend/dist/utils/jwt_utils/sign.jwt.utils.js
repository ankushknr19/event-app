"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signRefreshToken = exports.signAccessToken = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const env_1 = require("../../config/env");
const user_model_1 = require("../../models/user.model");
const signAccessToken = (res, payload) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign(payload, env_1.ACCESS_TOKEN_SECRET_KEY, {
            expiresIn: env_1.ACCESS_TOKEN_TIME_TO_LIVE,
        }, (err, accessToken) => {
            if (err) {
                return reject(new http_errors_1.default.InternalServerError());
            }
            res.cookie('accessToken', accessToken, {
                path: '/',
                maxAge: 30 * 24 * 60 * 60,
                httpOnly: true,
                sameSite: 'lax',
            });
            resolve(accessToken);
        });
    });
};
exports.signAccessToken = signAccessToken;
const signRefreshToken = (res, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refreshTokenId = (0, uuid_1.v4)();
        const user = yield user_model_1.UserModel.findById(userId);
        const refreshToken = jsonwebtoken_1.default.sign({
            id: refreshTokenId,
            userId,
        }, env_1.REFRESH_TOKEN_SECRET_KEY, {
            expiresIn: env_1.REFRESH_TOKEN_TIME_TO_LIVE,
        });
        user.refreshTokenId = refreshTokenId;
        yield user.save();
        res.cookie('refreshToken', refreshToken, {
            path: '/',
            maxAge: 30 * 24 * 60 * 60,
            httpOnly: true,
            sameSite: 'lax',
        });
        return { refreshToken, refreshTokenId };
    }
    catch (error) {
        return new http_errors_1.default.InternalServerError();
    }
});
exports.signRefreshToken = signRefreshToken;
//# sourceMappingURL=sign.jwt.utils.js.map