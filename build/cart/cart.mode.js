"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const cartSchema = new mongoose_1.default.Schema({
    quantity: Number,
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'user',
    },
    product: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'product',
    },
});
const Cart = mongoose_1.default.model('warehouse', cartSchema);
exports.default = Cart;
