"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const admin_middleware_1 = __importDefault(require("../../middleware/admin.middleware"));
const multer_2 = require("../../util/multer");
const admin_product_service_1 = __importDefault(require("./admin.product.service"));
class AdminProductController {
    constructor() {
        this.path = "/admin/product";
        this.router = (0, express_1.Router)();
        this.adminProductService = new admin_product_service_1.default();
        this.upload = (0, multer_1.default)({ storage: multer_2.fileStorage, fileFilter: multer_2.fileFilter });
        this.createProduct = async (request, response) => {
            try {
                const productData = request.body;
                const imagePath = request.files;
                if (!productData)
                    response.sendStatus(400).json({ message: "No data in body" });
                if (!imagePath)
                    response.sendStatus(400).json({ message: "No File in body" });
                const product = this.adminProductService.createProduct();
                response.send(product);
            }
            catch (error) {
                response.send(error);
            }
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/create`, admin_middleware_1.default, this.upload.array("productImage", 10), this.createProduct);
    }
}
exports.default = AdminProductController;
