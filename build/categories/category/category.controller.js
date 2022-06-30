"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_middleware_1 = __importDefault(require("../../middleware/admin.middleware"));
const category_model_1 = __importDefault(require("./category.model"));
class CategoryController {
    constructor() {
        this.path = "/category";
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/create`, admin_middleware_1.default, this.createCategory);
        this.router.put(`${this.path}/update/:categoryId`, admin_middleware_1.default, this.updateCategory);
        this.router.delete(`${this.path}/delete/:categoryId`, admin_middleware_1.default, this.deleteCategory);
    }
    async createCategory(request, response) {
        const { categoryName } = request.body;
        console.log(categoryName);
        try {
            const category = await category_model_1.default.create({ categoryName });
            response.send(category);
        }
        catch (error) {
            response.send(error);
        }
    }
    async updateCategory(request, response) {
        try {
            const categoryId = request.params.categoryId;
            const { categoryName } = request.body;
            const updatedCategory = await category_model_1.default.findByIdAndUpdate(categoryId, { categoryName }, { new: true });
            response.send(updatedCategory);
        }
        catch (error) {
            response.send(error);
        }
    }
    async deleteCategory(request, response) {
        try {
            const categoryId = request.params.categoryId;
            const category = await category_model_1.default.findByIdAndDelete(categoryId);
            response.send("deleted");
        }
        catch (error) {
            response.send(error);
        }
    }
}
exports.default = CategoryController;
