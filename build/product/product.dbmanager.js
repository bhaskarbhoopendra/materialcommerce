"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_model_1 = __importDefault(require("./product.model"));
class ProductDbManager {
    constructor() {
        this.product = product_model_1.default;
    }
    async CreateProduct(data) {
        return await this.product.create(Object.assign({}, data));
    }
    async UpdateProduct(productId, data) {
        return await this.product.findByIdAndUpdate(productId, Object.assign({}, data), { new: true });
    }
}
exports.default = ProductDbManager;
