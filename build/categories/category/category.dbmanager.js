"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_model_1 = __importDefault(require("./category.model"));
class CategoryDbManager {
    constructor() {
        this.categorymodel = category_model_1.default;
    }
    async createCategory(categoryName) {
        return await this.categorymodel.create({ categoryName });
    }
}
exports.default = CategoryDbManager;
