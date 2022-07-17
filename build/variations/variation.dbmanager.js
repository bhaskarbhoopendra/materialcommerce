"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const variatioin_model_1 = __importDefault(require("./variatioin.model"));
class VariationDbManger {
    constructor() {
        this.variationmodel = variatioin_model_1.default;
        this.createVariation = async (data) => {
            return await this.variationmodel.create(Object.assign({}, data));
        };
        this.updateVariationById = async (variationId, data) => {
            return await this.variationmodel.findByIdAndUpdate(variationId, Object.assign({}, data), { new: true });
        };
        this.variationById = async (variationId) => {
            return await this.variationmodel.findById(variationId).lean();
        };
        this.variationByIdAndDelete = async (variationId) => {
            return await this.variationmodel.findByIdAndDelete(variationId);
        };
    }
}
exports.default = VariationDbManger;
