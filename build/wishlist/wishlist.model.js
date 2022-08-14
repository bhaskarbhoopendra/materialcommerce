"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const wishlistSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'user',
    },
    product: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'product',
    },
});
const WishlistModel = mongoose_1.default.model('wishlist', wishlistSchema);
exports.default = WishlistModel;
