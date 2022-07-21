"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = exports.signJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signJwt = (payload, options) => {
    return jsonwebtoken_1.default.sign(payload, process.env.jwtAccessTokenSecretKey, options);
};
exports.signJwt = signJwt;
const verifyJwt = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.jwtAccessTokenSecretKey);
        return {
            valid: true,
            expired: false,
            decoded,
        };
    }
    catch (error) {
        return {
            valid: false,
            expired: error.message === 'jwt token expired',
            decoded: null,
        };
    }
};
exports.verifyJwt = verifyJwt;
//# sourceMappingURL=jwt.utils.js.map