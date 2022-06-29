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
const freightrate_model_1 = __importDefault(require("./freightrate.model"));
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
            const { weightType, upperbound, lowerbound, rate } = freightRateData;
            try {
                const newFreightRateData = {
                    zone: zoneId,
                    pincodetype: pincodeTypeId,
                    weightType,
                    upperbound,
                    lowerbound,
                    rate,
                };
                const freightrate = await freightrate_model_1.default.create(Object.assign({}, newFreightRateData));
                response.send(freightrate);
            }
            catch (error) {
                console.log(error);
            }
        };
        this.updateFreightRate = async (request, response) => {
            const freightRateId = request.params.freightrateId;
            const freightRateData = request.body;
            try {
                const updateFreightRate = await this.freightRateService.updateFreightRateService(freightRateId, freightRateData);
                response.send(updateFreightRate);
            }
            catch (error) {
                console.log(error);
            }
        };
        this.deleteFreightRate = async (request, response) => {
            const freightRateId = request.params.freightrateId;
            await this.freightRateService.deleteFreightRateService(freightRateId);
            response.send("Freight Rate Deleted");
        };
        this.getAllFreightRate = async (request, response) => {
            try {
                const freightRate = await freightrate_model_1.default.find({})
                    .populate("pincodetype")
                    .populate("zone");
                response.send(freightRate);
            }
            catch (error) {
                console.log(error);
            }
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/create/:zoneId/:pincodetypeId`, admin_middleware_1.default, this.createFreightRate);
        this.router.put(`${this.path}/update/:freightrateId`, admin_middleware_1.default, this.updateFreightRate);
        this.router.delete(`${this.path}/delete/:freightrateId`, admin_middleware_1.default, this.deleteFreightRate);
        this.router.get(`${this.path}`, admin_middleware_1.default, this.getAllFreightRate);
    }
}
exports.default = FreightRateController;
