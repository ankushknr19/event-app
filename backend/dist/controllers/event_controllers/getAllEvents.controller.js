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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllEventsController = void 0;
const event_model_1 = require("../../models/event.model");
function getAllEventsController(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allEvents = yield event_model_1.EventModel.find();
            if (!allEvents)
                throw new Error('events not found.');
            res.status(200).send(allEvents);
        }
        catch (error) {
            res.status(404).send(error.message);
        }
    });
}
exports.getAllEventsController = getAllEventsController;
//# sourceMappingURL=getAllEvents.controller.js.map