"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const freightrate_model_1 = __importDefault(require("./freightrate.model"));
class FreightRateDbManager {
    constructor() {
        this.freightratemodel = freightrate_model_1.default;
        this.createFreightRate = async (data) => {
            return await this.freightratemodel.create(Object.assign({}, data));
        };
        this.updateFreightRate = async (freightRateId, freightRateData) => {
            return await this.freightratemodel.findByIdAndUpdate(freightRateId, Object.assign({}, freightRateData), { new: true });
        };
        this.deleteFreightRate = async (freightRateId) => {
            return await this.freightratemodel.findByIdAndDelete(freightRateId);
        };
        this.getAllFreightRate = async () => {
            return await this.freightratemodel.find({});
        };
    }
}
exports.default = FreightRateDbManager;
