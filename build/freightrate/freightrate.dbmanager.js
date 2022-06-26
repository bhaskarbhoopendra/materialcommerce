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
    }
}
exports.default = FreightRateDbManager;
