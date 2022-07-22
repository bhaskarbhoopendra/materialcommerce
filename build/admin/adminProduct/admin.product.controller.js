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
                const files = request.files;
                if (!productData)
                    response.sendStatus(400).json({ message: "No data in body" });
                if (!files)
                    response.sendStatus(400).json({ message: "No File in body" });
                const product = await this.adminProductService.createProduct(productData, files);
                response.send(product);
            }
            catch (error) {
                response.send(error);
            }
        };
        this.updateProduct = async (request, response) => {
            try {
                const productId = request.params.productId;
                if (!productId)
                    response.send("Product Id not found");
                const productData = request.body;
                const files = request.files;
                if (!files)
                    response.send("Files are not found");
                const updatedProduct = await this.adminProductService.updateProduct(productId, productData, files);
                response.send(updatedProduct);
            }
            catch (error) {
                response.send(error);
            }
        };
        this.deleteProduct = async (request, response) => {
            try {
                const productId = request.params.productId;
                if (!productId)
                    response.send("Product Id not found");
                const deletedProduct = await this.adminProductService.deleteProduct(productId);
                response.send("Product Deleted");
            }
            catch (error) { }
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/create`, admin_middleware_1.default, this.upload.array("productImage", 10), this.createProduct);
        this.router.put(`${this.path}/update/:productId`, admin_middleware_1.default, this.upload.array("productImage", 10), this.updateProduct);
        this.router.delete(`${this.path}/delete/:productId`, admin_middleware_1.default, this.deleteProduct);
    }
}
exports.default = AdminProductController;
