"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const freightrate_dbmanager_1 = __importDefault(require("./freightrate.dbmanager"));
const freightrate_model_1 = __importDefault(require("./freightrate.model"));
class FreigthRateService {
    constructor() {
        this.freightRatemodel = freightrate_model_1.default;
        this.freightRateDbManger = new freightrate_dbmanager_1.default();
        this.createFreightRateService = async (zoneId, pincodeTypeId, freightRateData) => {
            const { weightType, lowerbound, upperbound, rate } = freightRateData;
            const newFreightRate = {
                zone: zoneId,
                pincodeType: pincodeTypeId,
                weightType: weightType,
                lowerbound: lowerbound,
                upperbound: upperbound,
                rate: rate,
            };
            const freightRate = await this.freightRateDbManger.createFreightRate(newFreightRate);
            return freightRate;
        };
    }
}
exports.default = FreigthRateService;
