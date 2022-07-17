"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_dbmanager_1 = __importDefault(require("../../product/product.dbmanager"));
class AdminProductService {
    constructor() {
        this.productDbManager = new product_dbmanager_1.default();
        this.createProduct = async (productData, files) => {
            const file = files.map((file) => {
                return file.path;
            });
            const newProduct = Object.assign(Object.assign({}, productData), { image: file });
            const product = await this.productDbManager.CreateProduct(newProduct);
            console.log(product);
            return product;
        };
    }
}
exports.default = AdminProductService;
