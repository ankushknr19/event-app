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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../../index"));
describe('POST /events', () => {
    const completeEventData = {
        name: 'Monsoon Acoustic Night',
        organizer: 'Grounds Nepal',
        category: 'music',
        event_type: 'live music',
        venue: 'Grounds Nepal',
        location: 'Bansbari, Dhapasi Marg',
        start_date: '2022-07-12',
        end_date: '2022-07-12',
        time: '4pm onwards',
        description: 'welcome',
        tags: ['live', 'Acoustic', 'fun'],
        ticket_type: 'paid',
        ticket_price: 500,
        image: 'fadfd',
        contact: [9812323412],
    };
    test('it should respond with 201', () => __awaiter(void 0, void 0, void 0, function* () {
        return yield (0, supertest_1.default)(index_1.default)
            .post('/api/events')
            .send(completeEventData)
            .expect(201);
    }));
});
//# sourceMappingURL=createEvent.test.js.map