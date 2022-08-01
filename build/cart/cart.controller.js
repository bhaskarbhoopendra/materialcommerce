"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_model_1 = __importDefault(require("./cart.model"));
class CartController {
    constructor() {
        this.path = '/cart';
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/create/:quantity/:productId/:userId`, this.createCart);
        this.router.get(`${this.path}/:userId`, this.getCart);
    }
    async createCart(request, response) {
        const productId = request.params.productId;
        const userId = request.params.userId;
        const quantity = request.params.quantity;
        console.log({ productId, userId, quantity });
        try {
            const newCart = {
                product: productId,
                user: userId,
                quantity: quantity,
            };
            const cart = await cart_model_1.default.create(Object.assign({}, newCart));
            response.send(cart);
        }
        catch (error) {
            response.send(error);
        }
    }
    async getCart(request, response) {
        try {
            const userId = request.params.userId;
            console.log(userId);
            const cart = await cart_model_1.default.find({});
            console.log(cart);
            response.send(cart);
        }
        catch (error) {
            response.send(error);
        }
    }
}
exports.default = CartController;
