"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartDbManager = void 0;
const cart_model_1 = __importDefault(require("./cart.model"));
class CartDbManager {
    constructor() {
        this.cartModel = cart_model_1.default;
    }
    async addToCart(data) {
        return await this.cartModel.create(Object.assign({}, data));
    }
    async getCart() {
        return await this.cartModel.find({});
    }
}
exports.CartDbManager = CartDbManager;
