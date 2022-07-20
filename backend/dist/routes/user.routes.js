"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const validateResource_1 = require("../middlewares/validateResource");
const user_schema_1 = require("../schemas/user.schema");
const router = express_1.default.Router();
router.route('/').get((_req, res) => res.send('hello user'));
router.route('/').post((0, validateResource_1.validate)(user_schema_1.createUserSchema), user_controller_1.userRegister);
exports.default = router;
//# sourceMappingURL=user.routes.js.map