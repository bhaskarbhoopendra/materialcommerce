"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const warehouse_dbmanager_1 = __importDefault(require("../../warehouse/warehouse.dbmanager"));
const vendor_dbmanager_1 = __importDefault(require("../vendor.dbmanager"));
class VendorWarehouseService {
    constructor() {
        this.warehouseDbManager = new warehouse_dbmanager_1.default();
        this.vendorDbManager = new vendor_dbmanager_1.default();
        this.vendorCreateWarehouseService = async (vendorId, warehouseData) => {
            const newWarehouseData = Object.assign(Object.assign({}, warehouseData), { vendor: vendorId });
            const vendorCreatedWarehouse = await this.warehouseDbManager.createWarehouse(newWarehouseData);
            return vendorCreatedWarehouse;
        };
    }
}
exports.default = VendorWarehouseService;
