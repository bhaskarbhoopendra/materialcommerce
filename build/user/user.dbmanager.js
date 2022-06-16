"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("./user.model"));
class UserDbManager {
    constructor() {
        this.user = user_model_1.default;
        this.getUserById = async (id) => {
            return await this.user.findById(id);
        };
        this.createUser = async (data) => {
            return await this.user.create(data);
        };
        this.updateUserById = async (id, data) => {
            return await this.user.findByIdAndUpdate(id, data, { new: true });
        };
        this.deleteUserById = async (id) => {
            return await this.user.findByIdAndDelete(id);
        };
    }
}
exports.default = UserDbManager;
