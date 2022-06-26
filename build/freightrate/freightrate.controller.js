"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PincodeTypeNotFoundException_1 = __importDefault(require("../exceptions/PincodeTypeNotFoundException"));
const ZoneNotFoundException_1 = __importDefault(require("../exceptions/ZoneNotFoundException"));
const admin_middleware_1 = __importDefault(require("../middleware/admin.middleware"));
const freightrate_dbmanager_1 = __importDefault(require("./freightrate.dbmanager"));
const freightrate_service_1 = __importDefault(require("./freightrate.service"));
class FreightRateController {
    constructor() {
        this.path = "/freightrate";
        this.router = (0, express_1.Router)();
        this.freightRateService = new freightrate_service_1.default();
        this.freightrateDbManager = new freightrate_dbmanager_1.default();
        this.createFreightRate = async (request, response) => {
            const zoneId = request.params.zoneId;
            if (zoneId == undefined)
                throw new ZoneNotFoundException_1.default(zoneId);
            const pincodeTypeId = request.params.pincodetypeId;
            if (pincodeTypeId == undefined)
                throw new PincodeTypeNotFoundException_1.default(pincodeTypeId);
            const freightRateData = request.body;
            try {
                const newfreightRate = await this.freightRateService.createFreightRateService(zoneId, pincodeTypeId, freightRateData);
                response.send(newfreightRate);
            }
            catch (error) {
                console.log(error);
            }
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/create/:zoneId/:pincodetypeId`, admin_middleware_1.default, this.createFreightRate);
    }
}
exports.default = FreightRateController;
