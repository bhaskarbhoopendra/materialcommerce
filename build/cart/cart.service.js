"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cart_dbmanager_1 = require("./cart.dbmanager");
class CartService {
    constructor() {
        this.cartDbManager = new cart_dbmanager_1.CartDbManager();
    }
    async addToCart(quantity, productId) {
        const newCart = {
            quantity: quantity,
            product: productId,
        };
        const newCartItem = await this.cartDbManager.addToCart(newCart);
        return newCartItem;
    }
    async getCart() {
        const cart = await this.cartDbManager.getCart();
        return cart;
    }
}
exports.default = CartService;
