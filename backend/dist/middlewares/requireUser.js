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
exports.requireAdmin = exports.checkLoggedInUser = exports.requireUser = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const user_model_1 = require("../models/user.model");
const requireUser = (_req, res, next) => {
    try {
        const user = res.locals.user;
        if (!user)
            throw new http_errors_1.default.Unauthorized();
        return next();
    }
    catch (error) {
        next(error);
    }
};
exports.requireUser = requireUser;
const checkLoggedInUser = (_req, res, next) => {
    try {
        const user = res.locals.user;
        if (user)
            throw new http_errors_1.default.Unauthorized();
        return next();
    }
    catch (error) {
        next(error);
    }
};
exports.checkLoggedInUser = checkLoggedInUser;
const requireAdmin = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        console.log(user);
        if (!user)
            throw new http_errors_1.default.Unauthorized();
        const DBuser = yield user_model_1.UserModel.findById(user === null || user === void 0 ? void 0 : user.userId).select('-password');
        if ((DBuser === null || DBuser === void 0 ? void 0 : DBuser.role) !== 'admin')
            throw new http_errors_1.default.Unauthorized();
        return next();
    }
    catch (error) {
        next(error);
    }
});
exports.requireAdmin = requireAdmin;
//# sourceMappingURL=requireUser.js.map