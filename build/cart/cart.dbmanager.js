"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cart_model_1 = __importDefault(require("./cart.model"));
class CartDbManager {
    constructor() {
        this.cartModel = cart_model_1.default;
        this.createCart = async (data) => {
            return await this.cartModel.create(Object.assign({}, data));
        };
        this.getCart = async (id) => {
            return await this.cartModel.findById(id);
        };
    }
}
exports.default = CartDbManager;
