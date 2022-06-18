"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pincodetype_model_1 = __importDefault(require("./pincodetype.model"));
class PincodeTypeDbManager {
    constructor() {
        this.pincodeTypeModel = pincodetype_model_1.default;
        this.getAllPinocdeType = async () => {
            return await this.pincodeTypeModel.find({}).lean();
        };
    }
}
exports.default = PincodeTypeDbManager;
