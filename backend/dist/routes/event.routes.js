"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createEvent_controller_1 = require("../controllers/event_controllers/createEvent.controller");
const requireUser_1 = require("../middlewares/requireUser");
const getAllEvents_controller_1 = require("../controllers/event_controllers/getAllEvents.controller");
const category_controller_1 = require("../controllers/event_controllers/category.controller");
const router = (0, express_1.Router)();
router
    .route('/')
    .get(getAllEvents_controller_1.getAllEventsController)
    .post(requireUser_1.requireUser, createEvent_controller_1.createEventController);
router
    .route('/categories')
    .get(category_controller_1.getAllCategoryController)
    .post(requireUser_1.requireUser, category_controller_1.createCategoryController);
exports.default = router;
//# sourceMappingURL=event.routes.js.map