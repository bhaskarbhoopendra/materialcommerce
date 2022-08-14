"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cart_dbmanager_1 = __importDefault(require("./cart.dbmanager"));
class CartService {
    constructor() {
        this.cartDbManager = new cart_dbmanager_1.default();
        this.createCart = async (productId, userId, quantity) => {
            const newCart = {
                product: productId,
                user: userId,
                quantity: quantity,
            };
            const cartByUser = await this.cartDbManager.getCart(userId);
            const cart = await this.cartDbManager.createCart(newCart);
            console.log(cartByUser);
            return cartByUser;
        };
        this.getCart = async (userId) => {
            const cart = await this.cartDbManager.getCart(userId);
            return cart;
        };
    }
}
exports.default = CartService;
