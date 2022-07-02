"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const warehouse_model_1 = __importDefault(require("./warehouse.model"));
class WarehouseDbManager {
    constructor() {
        this.warehouse = warehouse_model_1.default;
        this.createWarehouse = async (data) => {
            return await this.warehouse.create(Object.assign({}, data));
        };
        this.getAllWarehouse = async () => {
            return await this.warehouse.find({});
        };
        this.warehouseByID = async (id) => {
            return await this.warehouse.findById(id);
        };
        this.warehouseByIDAndUpdate = async (id, data) => {
            return this.warehouse.findByIdAndUpdate(id, data, { new: true });
        };
        this.warehouseByIDAndDelete = async (id) => {
            return await this.warehouse.findByIdAndDelete(id);
        };
    }
}
exports.default = WarehouseDbManager;
