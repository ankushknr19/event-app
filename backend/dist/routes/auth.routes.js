"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login_controller_1 = require("../controllers/auth_controllers/login.controller");
const login_schema_1 = require("../schemas/auth_schemas/login.schema");
const register_controller_1 = require("../controllers/auth_controllers/register.controller");
const register_schema_1 = require("../schemas/auth_schemas/register.schema");
const validateResource_1 = require("../middlewares/validateResource");
const router = express_1.default.Router();
router.route('/login').post((0, validateResource_1.validate)(login_schema_1.userLoginSchema), login_controller_1.userLoginController);
router
    .route('/register')
    .post((0, validateResource_1.validate)(register_schema_1.userRegisterSchema), register_controller_1.userRegisterController);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map