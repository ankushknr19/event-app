"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const EventSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.default.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    organizer: { type: String, required: true },
    category: { type: String, required: true },
    event_type: { type: String, required: true },
    venue: { type: String, required: true },
    location: { type: String, required: true },
    start_date: { type: Date, required: true },
    end_date: Date,
    time: String,
    description: String,
    tags: [{ type: String, lowercase: true }],
    ticket: {
        type: { type: String, enum: ['paid', 'free'], required: true },
        price: { type: Number, required: true },
    },
    image: { type: String },
    contact: [{ type: Number }],
    created: { type: Date, default: new Date() },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
exports.EventModel = mongoose_1.default.model('Event', EventSchema);
//# sourceMappingURL=event.model.js.map