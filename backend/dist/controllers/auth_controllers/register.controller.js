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
exports.userRegisterController = void 0;
const lodash_1 = __importDefault(require("lodash"));
const http_errors_1 = __importDefault(require("http-errors"));
const user_model_1 = require("../../models/user.model");
const register_schema_1 = require("../../schemas/auth_schemas/register.schema");
const env_1 = require("../../config/env");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userRegisterController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield register_schema_1.userRegisterSchema.validateAsync(req.body);
        const { email, password, role } = result;
        const checkDB = yield user_model_1.UserModel.findOne({ email }).select('email');
        if (checkDB) {
            throw new http_errors_1.default.Conflict('email already exists');
        }
        const saltRound = parseInt(env_1.SALT_ROUND);
        const salt = yield bcrypt_1.default.genSalt(saltRound | 10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        const newUser = yield user_model_1.UserModel.create({
            email,
            password: hashedPassword,
            role,
        });
        res.status(201).json(lodash_1.default.omit(newUser.toJSON(), 'password'));
    }
    catch (error) {
        if (error.isJoi)
            error.status = 422;
        next(error);
    }
});
exports.userRegisterController = userRegisterController;
//# sourceMappingURL=register.controller.js.map