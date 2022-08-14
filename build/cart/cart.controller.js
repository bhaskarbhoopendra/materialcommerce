"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_model_1 = __importDefault(require("./cart.model"));
const cart_service_1 = __importDefault(require("./cart.service"));
class CartController {
    constructor() {
        this.path = '/cart';
        this.router = (0, express_1.Router)();
        this.cartService = new cart_service_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/create/:productId/:userId`, this.createCart);
        this.router.get(`${this.path}/:userId`, this.getCart);
    }
    async createCart(request, response) {
        const productId = request.params.productId;
        const userId = request.params.userId;
        const quantity = request.body.quantity;
        console.log({ productId, userId, quantity });
        try {
            const newCart = {
                user: userId,
            };
            const cart = await cart_model_1.default.create(Object.assign({}, newCart));
            await cart.products.push({ productId: productId, quantity: quantity });
            await cart.save();
            response.send(cart);
        }
        catch (error) {
            response.send(error);
        }
    }
    async getCart(request, response) {
        try {
            const userId = request.params.userId;
            const cart = await cart_model_1.default.findById(userId);
            response.send(cart);
        }
        catch (error) {
            response.send(error);
        }
    }
}
exports.default = CartController;
