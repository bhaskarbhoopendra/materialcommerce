"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const subcategorySchema = new mongoose_1.default.Schema({
    subcategoryName: { type: String, required: true },
    subcategoryImage: { type: String, required: true },
});
const SubCategoryModel = mongoose_1.default.model("subcategory", subcategorySchema);
exports.default = SubCategoryModel;
