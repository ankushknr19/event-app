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
exports.reissueTokens = void 0;
const lodash_1 = require("lodash");
const http_errors_1 = __importDefault(require("http-errors"));
const user_model_1 = require("../../models/user.model");
const verify_jwt_utils_1 = require("./verify.jwt.utils");
const sign_jwt_utils_1 = require("./sign.jwt.utils");
const reissueTokens = (res, refreshToken) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        const { decoded, expired } = yield (0, verify_jwt_utils_1.verifyRefreshToken)(refreshToken);
        if (!decoded || !(0, lodash_1.get)(decoded, 'userId') || expired) {
            return reject(new http_errors_1.default.Unauthorized());
        }
        const user = yield user_model_1.UserModel.findById((0, lodash_1.get)(decoded, 'userId'));
        if (!user) {
            return reject(new http_errors_1.default.Unauthorized());
        }
        const newAccessToken = yield (0, sign_jwt_utils_1.signAccessToken)(res, {
            userId: user._id,
            role: user.role,
        });
        const { refreshToken: newRefreshToken, refreshTokenId } = yield (0, sign_jwt_utils_1.signRefreshToken)(res, user._id);
        user.refreshTokenId = refreshTokenId;
        yield user.save();
        resolve({ newAccessToken, newRefreshToken }),
            (err) => {
                if (err) {
                    return reject(new http_errors_1.default.InternalServerError());
                }
            };
    }));
};
exports.reissueTokens = reissueTokens;
//# sourceMappingURL=reissue.jwt.utils.js.map