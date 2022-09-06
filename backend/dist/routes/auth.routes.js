"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login_controller_1 = require("../controllers/auth_controllers/login.controller");
const register_controller_1 = require("../controllers/auth_controllers/register.controller");
const requireUser_1 = require("../controllers/auth_controllers/jwt_utils/requireUser");
const logout_controller_1 = require("../controllers/auth_controllers/logout.controller");
const router = express_1.default.Router();
router.post('/login', login_controller_1.userLoginController);
router.post('/register', register_controller_1.userRegisterController);
router.delete('/logout', requireUser_1.requireUser, logout_controller_1.userLogoutController);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map