"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const freightrate_dbmanager_1 = __importDefault(require("./freightrate.dbmanager"));
class FreigthRateService {
    constructor() {
        // freightRatemodel = FreightRateModel;
        this.freightRateDbManger = new freightrate_dbmanager_1.default();
        this.createFreightRateService = async (zoneId, pincodeTypeId, freightRateData) => {
            const { weightType, upperbound, lowerbound, rate } = freightRateData;
            const newFreightRateData = {
                zone: zoneId,
                pincodetype: pincodeTypeId,
                weightType,
                upperbound,
                lowerbound,
                rate,
            };
            const freightrate = await this.freightRateDbManger.createFreightRate(newFreightRateData);
        };
        this.updateFreightRateService = async (freightRateId, freightRateData) => {
            const freightRate = await this.freightRateDbManger.updateFreightRate(freightRateId, freightRateData);
            return freightRate;
        };
        this.deleteFreightRateService = async (freightRateId) => {
            return await this.freightRateDbManger.deleteFreightRate(freightRateId);
        };
        this.getAllFreightRateService = async () => {
            return await this.freightRateDbManger.getAllFreightRate();
        };
    }
}
exports.default = FreigthRateService;
