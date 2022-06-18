"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zone_model_1 = __importDefault(require("./zone.model"));
class ZoneDbManager {
    constructor() {
        this.zone = zone_model_1.default;
        this.getAllZone = async () => {
            return await this.zone.find({}).lean();
        };
        this.updateZoneById = async (id, zone) => {
            return await this.zone.findByIdAndUpdate(id, zone, { new: true });
        };
    }
}
exports.default = ZoneDbManager;
