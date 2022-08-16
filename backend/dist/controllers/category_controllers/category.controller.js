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
exports.getAllCategory = exports.createCategory = void 0;
const category_model_1 = require("../../models/category.model");
function createCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, types } = req.body;
            const newCategory = yield category_model_1.CategoryModel.create({ name, types });
            res.status(201).send(newCategory);
        }
        catch (error) {
            res.status(404).send(error.message);
        }
    });
}
exports.createCategory = createCategory;
function getAllCategory(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allCategory = yield category_model_1.CategoryModel.find();
            if (!allCategory)
                throw new Error('no category found');
            res.status(201).send(allCategory);
        }
        catch (error) {
            res.status(404).send(error.message);
        }
    });
}
exports.getAllCategory = getAllCategory;
//# sourceMappingURL=category.controller.js.map