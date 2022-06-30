"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const admin_middleware_1 = __importDefault(require("../../middleware/admin.middleware"));
const auth_middleware_1 = __importDefault(require("../../middleware/auth.middleware"));
const multer_2 = require("../../util/multer");
const subcateogry_model_1 = __importDefault(require("./subcateogry.model"));
class SubCategoryController {
    constructor() {
        this.path = "/subcategory";
        this.router = (0, express_1.Router)();
        this.upload = (0, multer_1.default)({ storage: multer_2.fileStorage, fileFilter: multer_2.fileFilter });
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/create`, admin_middleware_1.default, this.upload.single("subcategoryImage"), this.createSubCategory);
        this.router.put(`${this.path}/update/:subcategoryId`, admin_middleware_1.default, this.upload.single("subcategoryImage"), this.updateSubCategory);
        this.router.delete(`{this.path}/delete/:subcategoryId`, auth_middleware_1.default, this.deleteSubCategory);
        this.router.get(`${this.path}`, auth_middleware_1.default, this.getAllSubCategory);
    }
    async createSubCategory(request, response) {
        var _a;
        try {
            const { subcategoryName } = request.body;
            const subcategoryImagePath = (_a = request.file) === null || _a === void 0 ? void 0 : _a.path;
            if (subcategoryImagePath == undefined)
                response.send("Image path not defined");
            const newSubcategory = {
                subcategoryName: subcategoryName,
                subcategoryImage: subcategoryImagePath,
            };
            const subcategory = await subcateogry_model_1.default.create(Object.assign({}, newSubcategory));
            response.send(subcategory);
        }
        catch (error) {
            response.send(error);
        }
    }
    async updateSubCategory(request, response) {
        var _a;
        try {
            const subCategoryId = request.params.subcategoryId;
            const { subcategoryName } = request.body;
            const subcategoryImagePath = (_a = request.file) === null || _a === void 0 ? void 0 : _a.path;
            const updatedSubCategory = {
                subcategoryName: subcategoryName,
                subcategoryImage: subcategoryImagePath,
            };
            const subCategory = await subcateogry_model_1.default.findByIdAndUpdate(subCategoryId, Object.assign({}, updatedSubCategory), { new: true });
            response.send(subCategory);
        }
        catch (error) {
            response.send(error);
        }
    }
    async deleteSubCategory(request, response) {
        try {
            const subCategoryId = request.params.subcategoryId;
            await subcateogry_model_1.default.findByIdAndDelete(subCategoryId);
            response.send("Sub Category Deleted");
        }
        catch (error) {
            response.send(error);
        }
    }
    async getAllSubCategory(request, response) {
        try {
            const subCategory = await subcateogry_model_1.default.find({}).lean();
            response.send(subCategory);
        }
        catch (error) {
            response.send(error);
        }
    }
}
exports.default = SubCategoryController;
