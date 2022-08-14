"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_model_1 = __importDefault(require("./user.model"));
class UserController {
    constructor() {
        this.path = '/user';
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/:userId/cart/:productId/create`, this.createCart);
        this.router.get(`${this.path}/:userId`, this.getUser);
    }
    async createCart(request, response) {
        const userId = request.params.userId;
        const productId = request.params.productId;
        const quantity = request.body.quantity;
        const user = await user_model_1.default.findById(userId);
        const cart = await (user === null || user === void 0 ? void 0 : user.cart);
        const cartItems = {
            productId: productId,
            quantity: quantity,
        };
        try {
            if (cart) {
                if (cart.length > 0) {
                    for (let index = 0; index < cart.length; index++) {
                        const element = cart[index];
                        if (element.productId == productId) {
                            return response.send('productExists');
                        }
                        else {
                            user === null || user === void 0 ? void 0 : user.cart.push(cartItems);
                            user === null || user === void 0 ? void 0 : user.save();
                            return response.send(user);
                        }
                    }
                }
                else {
                    user === null || user === void 0 ? void 0 : user.cart.push(cartItems);
                    user === null || user === void 0 ? void 0 : user.save();
                    return response.send(user);
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async getUser(request, response) {
        const userId = request.params.userId;
        try {
            const user = await user_model_1.default.findById(userId);
            response.status(201).send(user);
        }
        catch (error) {
            response.send(error);
        }
    }
}
exports.default = UserController;
