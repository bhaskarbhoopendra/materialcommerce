"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const warehouse_dbmanager_1 = __importDefault(require("../../warehouse/warehouse.dbmanager"));
class VendorWarehouseService {
    constructor() {
        this.warehouseDbManager = new warehouse_dbmanager_1.default();
        this.vendorCreateWarehouseService = async (vendorId, warehouseData) => {
            const newWarehouse = Object.assign(Object.assign({}, warehouseData), { vendor: vendorId });
            const vendorCreatedWarehouse = await this.warehouseDbManager.createWarehouse(newWarehouse);
            return vendorCreatedWarehouse;
        };
        this.getWarehouse = async () => {
            const warehouse = await this.warehouseDbManager.getAllWarehouse();
            return warehouse;
        };
    }
}
exports.default = VendorWarehouseService;
