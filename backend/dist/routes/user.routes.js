"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const requireUser_1 = require("../middlewares/requireUser");
const router = express_1.default.Router();
router.route('/profile').get(requireUser_1.requireUser, (_req, res) => {
    res.send('profile route is working...');
});
exports.default = router;
//# sourceMappingURL=user.routes.js.map