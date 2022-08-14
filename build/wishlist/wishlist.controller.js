"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_model_1 = __importDefault(require("../cart/cart.model"));
const wishlist_model_1 = __importDefault(require("./wishlist.model"));
class WishlistController {
    constructor() {
        this.path = '/wishlist';
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/create/:productId/:userId`, this.createWishlist);
        this.router.get(`${this.path}/:userId`, this.getWishlist);
    }
    async createWishlist(request, response) {
        const productId = request.params.productId;
        const userId = request.params.userId;
        console.log({ productId, userId });
        try {
            const newWishlist = {
                product: productId,
                user: userId,
            };
            const cart = await wishlist_model_1.default.create(Object.assign({}, newWishlist));
            response.send(cart);
        }
        catch (error) {
            response.send(error);
        }
    }
    async getWishlist(request, response) {
        try {
            const userId = request.params.userId;
            const wishlist = await cart_model_1.default.findById(userId);
            response.send(wishlist);
        }
        catch (error) {
            response.send(error);
        }
    }
}
exports.default = WishlistController;
