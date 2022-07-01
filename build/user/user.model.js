"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    googleId: {
        type: String,
        default: null,
    },
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    phoneNumber: String,
    source: { type: String },
    lastVisited: { type: Date, default: new Date() },
    cart: [String],
    wishlist: [String],
});
exports.addressSchema = new mongoose_1.default.Schema({
    city: String,
    country: String,
    street: String,
    pincode: Number,
    phoneNumber: Number,
});
const UserModel = mongoose_1.default.model("user", userSchema);
exports.default = UserModel;
//source: { type: String, required: [true, "Source not specified"] },
