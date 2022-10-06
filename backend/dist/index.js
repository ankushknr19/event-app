"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const cors_1 = __importDefault(require("cors"));
const https_1 = __importDefault(require("https"));
const helmet_1 = __importDefault(require("helmet"));
const express_1 = __importDefault(require("express"));
const env_1 = require("./config/env");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_errors_1 = __importDefault(require("http-errors"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const db_connect_1 = require("./config/db.connect");
const event_routes_1 = __importDefault(require("./routes/event.routes"));
const winstonLogger_1 = __importDefault(require("./middlewares/winstonLogger"));
const rateLimit_1 = require("./middlewares/rateLimit");
const morganLogger_1 = __importDefault(require("./middlewares/morganLogger"));
const errorHandler_1 = require("./middlewares/errorHandler");
const deserializeUser_1 = require("./middlewares/deserializeUser");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(rateLimit_1.limiter);
app.use(express_1.default.json({ limit: '2mb' }));
app.use((0, cookie_parser_1.default)());
app.use(deserializeUser_1.deserializeUser);
app.use(morganLogger_1.default);
(0, db_connect_1.connectDB)();
app.use('/api/auth', auth_routes_1.default);
app.use('/api/me', user_routes_1.default);
app.use('/api/events', event_routes_1.default);
app.get('/', (_req, res) => {
    res.send('api is running...');
});
app.use((_req, _res, next) => {
    next(new http_errors_1.default.NotFound());
});
app.use(errorHandler_1.errorHandler);
const server = https_1.default
    .createServer({
    key: fs_1.default.readFileSync('key.pem'),
    cert: fs_1.default.readFileSync('cert.pem'),
}, app)
    .listen(env_1.PORT, () => winstonLogger_1.default.info(`server is running on port https://localhost:${env_1.PORT}....`));
process.on('SIGTERM', () => {
    server.close(() => winstonLogger_1.default.warn('process terminated'));
});
exports.default = app;
//# sourceMappingURL=index.js.map