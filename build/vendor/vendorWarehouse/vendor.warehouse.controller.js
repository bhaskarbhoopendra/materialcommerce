"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vendor_dbmanager_1 = __importDefault(require("../vendor.dbmanager"));
const vendor_warehouse_service_1 = __importDefault(require("./vendor.warehouse.service"));
class VendorWarehouseController {
    constructor() {
        this.path = "/vendor/warehouse";
        this.router = (0, express_1.Router)();
        this.vendorWarehouseService = new vendor_warehouse_service_1.default();
        this.vendorDbManager = new vendor_dbmanager_1.default();
        this.vendorAddWarehouse = async (request, response) => {
            var _a;
            try {
                const vendorId = request.params.vendorId;
                const warehouseData = request.body;
                const vendorCreatedWarehouse = await this.vendorWarehouseService.vendorCreateWarehouseService(vendorId, warehouseData);
                const vendor = await this.vendorDbManager.findVendorById(vendorId);
                (_a = vendor === null || vendor === void 0 ? void 0 : vendor.warehouse) === null || _a === void 0 ? void 0 : _a.push(vendorCreatedWarehouse);
                response.send(vendorCreatedWarehouse);
            }
            catch (error) {
                response.send(error);
            }
        };
        this.initalizeRoutes();
    }
    initalizeRoutes() {
        this.router.post(`${this.path}/create/:vendorId`, this.vendorAddWarehouse);
    }
}
exports.default = VendorWarehouseController;
