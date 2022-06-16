"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zone_dbmanager_1 = __importDefault(require("./zone.dbmanager"));
const zone_model_1 = __importDefault(require("./zone.model"));
class ZoneController {
    constructor() {
        this.path = "/zone";
        this.router = (0, express_1.Router)();
        this.zone = zone_model_1.default;
        this.zoneDbManager = new zone_dbmanager_1.default();
        this.createZone = async (request, response) => {
            try {
                const zoneData = request.body;
                const zone = await this.zone.create(Object.assign({}, zoneData));
                response.send(zone);
            }
            catch (error) {
                console.log(error);
            }
        };
        this.getAllZone = async (request, response) => {
            try {
                const zone = await this.zoneDbManager.getAllZone();
                response.send(zone);
            }
            catch (error) {
                console.log(error);
            }
        };
        this.updateZone = async (request, response) => {
            try {
                const zoneId = request.params.zoneId;
                const zoneData = request.body;
                const updatedZone = await this.zoneDbManager.updateZoneById(zoneId, zoneData);
                response.send(updatedZone);
            }
            catch (error) {
                console.log(error);
            }
        };
        this.deleteZone = async (request, response) => {
            try {
                const zoneId = request.params.zoneId;
                const deletedZone = await this.zone.findByIdAndDelete(zoneId);
                response.send("zone Delted");
            }
            catch (error) {
                console.log(error);
            }
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/create`, this.createZone);
        this.router.get(`${this.path}/get`, this.getAllZone);
        this.router.put(`${this.path}/update/:zoneId`, this.updateZone);
        this.router.delete(`${this.path}/delete/:zoneId`, this.deleteZone);
    }
}
exports.default = ZoneController;
