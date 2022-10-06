"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLIENT_ORIGIN = exports.GOOGLE_JWKS_ISSUER = exports.GOOGLE_JWKS_URL = exports.GOOGLE_TOKEN_URL = exports.GOOGLE_REDIRECT_URL = exports.GOOGLE_CLIENT_SECRET = exports.GOOGLE_CLIENT_ID = exports.REFRESH_TOKEN_TIME_TO_LIVE = exports.ACCESS_TOKEN_TIME_TO_LIVE = exports.REFRESH_TOKEN_SECRET_KEY = exports.ACCESS_TOKEN_SECRET_KEY = exports.SALT_ROUND = exports.MONGO_COMPASS_URI = exports.NODE_ENV = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = (process.env.PORT || 5000);
exports.NODE_ENV = process.env.NODE_ENV;
exports.MONGO_COMPASS_URI = process.env.MONGO_COMPASS_URI;
exports.SALT_ROUND = process.env.SALT_ROUND;
exports.ACCESS_TOKEN_SECRET_KEY = process.env
    .ACCESS_TOKEN_SECRET_KEY;
exports.REFRESH_TOKEN_SECRET_KEY = process.env
    .REFRESH_TOKEN_SECRET_KEY;
exports.ACCESS_TOKEN_TIME_TO_LIVE = process.env
    .ACCESS_TOKEN_TIME_TO_LIVE;
exports.REFRESH_TOKEN_TIME_TO_LIVE = process.env
    .REFRESH_TOKEN_TIME_TO_LIVE;
exports.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
exports.GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
exports.GOOGLE_REDIRECT_URL = process.env.GOOGLE_REDIRECT_URL;
exports.GOOGLE_TOKEN_URL = process.env.GOOGLE_TOKEN_URL;
exports.GOOGLE_JWKS_URL = process.env.GOOGLE_JWKS_URL;
exports.GOOGLE_JWKS_ISSUER = process.env.GOOGLE_JWKS_ISSUER;
exports.CLIENT_ORIGIN = process.env.CLIENT_ORIGIN;
//# sourceMappingURL=env.js.map