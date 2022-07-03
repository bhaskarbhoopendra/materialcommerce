"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vendor_warehouse_service_1 = __importDefault(require("./vendor.warehouse.service"));
class VendorWarehouseController {
    constructor() {
        this.path = "/vendor/warehouse";
        this.router = (0, express_1.Router)();
        this.vendorWarehouseService = new vendor_warehouse_service_1.default();
        this.vendorCreateWarehouse = async (request, response) => {
            try {
                const vendorId = request.params.vendorId;
                const warehouseData = request.body;
                const vendorCreatedWarehouse = await this.vendorWarehouseService.vendorCreateWarehouseService(vendorId, warehouseData);
                response.send(vendorCreatedWarehouse);
            }
            catch (error) {
                response.send(error);
            }
        };
        this.getWarehouse = async (request, response) => {
            try {
                const warehouse = await this.vendorWarehouseService.getWarehouse();
                response.send(warehouse);
            }
            catch (error) {
                response.send(error);
            }
        };
        this.initalizeRoutes();
    }
    initalizeRoutes() {
        this.router.post(`${this.path}/create/:vendorId`, this.vendorCreateWarehouse);
        this.router.get(`${this.path}`, this.getWarehouse);
    }
}
exports.default = VendorWarehouseController;
