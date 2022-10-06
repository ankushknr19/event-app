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
exports.getAllEventsController = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const event_model_1 = require("../../models/event.model");
function getAllEventsController(_req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allEvents = yield event_model_1.EventModel.find().lean();
            if (allEvents.length === 0)
                throw new http_errors_1.default.NotFound();
            res.status(200).send(allEvents);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getAllEventsController = getAllEventsController;
//# sourceMappingURL=getAllEvents.controller.js.map