"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEventSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createEventSchema = joi_1.default.object({
    name: joi_1.default.string().min(3).max(60).required(),
    organizer: joi_1.default.string().min(3).max(60).required(),
    category: joi_1.default.string().required(),
    event_type: joi_1.default.string().required(),
    venue: joi_1.default.string().min(3).max(60).required(),
    location: joi_1.default.string().min(4).max(200).required(),
    start_date: joi_1.default.string().required(),
    end_date: joi_1.default.string().required(),
    time: joi_1.default.string().max(30).optional(),
    description: joi_1.default.string().max(2000).allow('').optional(),
    tags: joi_1.default.array().items(joi_1.default.string()).optional(),
    ticket_type: joi_1.default.string().valid('paid', 'free'),
    ticket_price: joi_1.default.number().required(),
    image: joi_1.default.string().allow('').optional(),
    contact: joi_1.default.array().items(joi_1.default.number()).optional(),
});
//# sourceMappingURL=event.schema.js.map