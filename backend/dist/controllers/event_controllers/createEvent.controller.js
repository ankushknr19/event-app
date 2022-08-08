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
exports.createEventController = void 0;
const event_model_1 = require("../../models/event.model");
function createEventController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, organizer, category, event_type, venue, location, start_date, end_date, time, description, tags, ticket_type, ticket_price, image, contact, } = req.body;
            const user = res.locals.user.userId;
            const newEvent = yield event_model_1.EventModel.create({
                user,
                name,
                organizer,
                category,
                event_type,
                venue,
                location,
                start_date,
                end_date,
                time,
                description,
                tags,
                ticket: {
                    type: ticket_type,
                    price: ticket_price,
                },
                image,
                contact,
            });
            res.status(200).send(newEvent);
        }
        catch (error) {
            res.status(404).send(error.message);
        }
    });
}
exports.createEventController = createEventController;
//# sourceMappingURL=createEvent.controller.js.map