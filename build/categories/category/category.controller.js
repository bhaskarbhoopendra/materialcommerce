"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const admin_middleware_1 = __importDefault(require("../../middleware/admin.middleware"));
const multer_2 = require("../../util/multer");
const category_model_1 = __importDefault(require("./category.model"));
class CategoryController {
    constructor() {
        this.path = "/category";
        this.router = (0, express_1.Router)();
        this.upload = (0, multer_1.default)({ storage: multer_2.fileStorage, fileFilter: multer_2.fileFilter });
        this.nestSubcategory = (request, response) => {
            try {
                const subcategoryID = request.params.subcategoryId;
                const nestCategorywithSubCateogry = {
                    subcategory: subcategoryID,
                };
            }
            catch (error) { }
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/create`, admin_middleware_1.default, this.upload.single("categoryImage"), this.createCategory);
        this.router.put(`${this.path}/update/:categoryId`, admin_middleware_1.default, this.upload.single("categoryImage"), this.updateCategory);
        this.router.delete(`${this.path}/delete/:categoryId`, admin_middleware_1.default, this.deleteCategory);
        this.router.get(`${this.path}`, admin_middleware_1.default, this.getAllCategory);
        this.router.post(`${this.path}/addsubcategory/:subcategoryId`, admin_middleware_1.default, this.nestSubcategory);
    }
    async createCategory(request, response) {
        var _a;
        const { categoryName } = request.body;
        const categoryimagepath = (_a = request.file) === null || _a === void 0 ? void 0 : _a.path;
        console.log({ categoryName, categoryimagepath });
        try {
            const newCategory = {
                categoryName: categoryName,
                categoryImage: categoryimagepath,
            };
            const category = await category_model_1.default.create(Object.assign({}, newCategory));
            response.send(category);
        }
        catch (error) {
            response.send(error);
        }
    }
    async updateCategory(request, response) {
        var _a;
        try {
            const categoryId = request.params.categoryId;
            const { categoryName } = request.body;
            const categoryimagepath = (_a = request.file) === null || _a === void 0 ? void 0 : _a.path;
            const newUpatedCategory = {
                categoryName: categoryName,
                categoryImage: categoryimagepath,
            };
            const updatedCategory = await category_model_1.default.findByIdAndUpdate(categoryId, Object.assign({}, newUpatedCategory), { new: true });
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
    async getAllCategory(request, response) {
        try {
            const categories = await category_model_1.default.find({});
            response.send(categories);
        }
        catch (error) {
            response.send(error);
        }
    }
}
exports.default = CategoryController;
