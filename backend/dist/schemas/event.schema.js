"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEventSchema = void 0;
const zod_1 = require("zod");
exports.createEventSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: 'Event name is required',
        })
            .min(3)
            .max(30),
        organizer: zod_1.z
            .string({
            required_error: 'Organizer name is required',
        })
            .min(3)
            .max(30),
        category: zod_1.z.string({
            required_error: 'Event category is required',
        }),
        event_type: zod_1.z.string({
            required_error: 'Event type is required',
        }),
        venue: zod_1.z
            .string({
            required_error: 'Venue is required',
        })
            .min(3)
            .max(30),
        location: zod_1.z
            .string({
            required_error: 'Location is required',
        })
            .min(4)
            .max(100),
        start_date: zod_1.z.string({
            required_error: 'Start date is required',
        }),
        end_date: zod_1.z.string({
            required_error: 'End date is required',
        }),
        time: zod_1.z.string().max(30).optional(),
        description: zod_1.z.string().max(500).optional(),
        tags: zod_1.z.array(zod_1.z.string()).optional(),
        ticket_type: zod_1.z.enum(['paid', 'free']),
        ticket_price: zod_1.z.number({
            required_error: 'Ticket price is required',
        }),
        image: zod_1.z.string().optional(),
        contact: zod_1.z.array(zod_1.z.number()).optional(),
    }),
});
//# sourceMappingURL=event.schema.js.map