"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("../config/env");
function connectDB() {
    try {
        const dbURI = env_1.MONGO_COMPASS_URI || '';
        mongoose_1.default.connect(dbURI, () => console.log('Database connected successfully!'));
    }
    catch (error) {
        console.log('error during inital connection to mongodb database');
        process.exit(1);
    }
    mongoose_1.default.set('debug', true);
}
exports.connectDB = connectDB;
//# sourceMappingURL=db.connect.js.map