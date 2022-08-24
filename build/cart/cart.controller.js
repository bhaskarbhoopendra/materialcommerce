"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_service_1 = __importDefault(require("./cart.service"));
class CartController {
    constructor() {
        this.path = "/cart";
        this.router = (0, express_1.Router)();
        this.cartService = new cart_service_1.default();
        this.addToCart = async (request, response) => {
            try {
                const { quantity } = request.body;
                const productId = request.params.productId;
                const cartItem = await this.cartService.addToCart(quantity, productId);
                response.send(cartItem);
            }
            catch (error) {
                console.log(error);
            }
        };
        this.getCart = async (request, response) => {
            try {
                const cart = await this.cartService.getCart();
                response.send(cart);
            }
            catch (error) {
                console.log(error);
            }
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/create/:productId`, this.addToCart);
        this.router.get(`${this.path}/get`, this.getCart);
    }
}
exports.default = CartController;
