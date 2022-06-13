"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    id: {
        type: String,
        default: null,
    },
    email: String,
    firstName: String,
    lastName: String,
    phoneNumber: String,
    source: { type: String, required: [true, "Source not specified"] },
    lastVisited: { type: Date, default: new Date() },
});
const UserModel = mongoose_1.default.model("user", userSchema);
exports.default = UserModel;
