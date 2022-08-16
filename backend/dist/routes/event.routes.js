"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createEvent_controller_1 = require("../controllers/event_controllers/createEvent.controller");
const validateResource_1 = require("../middlewares/validateResource");
const requireUser_1 = require("../middlewares/requireUser");
const event_schema_1 = require("../schemas/event.schema");
const getAllEvents_controller_1 = require("../controllers/event_controllers/getAllEvents.controller");
const router = (0, express_1.Router)();
router
    .route('/')
    .get(getAllEvents_controller_1.getAllEventsController)
    .post(requireUser_1.requireUser, (0, validateResource_1.validateResource)(event_schema_1.createEventSchema), createEvent_controller_1.createEventController);
exports.default = router;
//# sourceMappingURL=event.routes.js.map