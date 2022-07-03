"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_vendor_warehouse_service_1 = __importDefault(require("./admin.vendor.warehouse.service"));
class AdminVendorWarehouseController {
    constructor() {
        this.path = "/admin/vendor/warehouse";
        this.router = (0, express_1.Router)();
        this.adminVendorWarehouseService = new admin_vendor_warehouse_service_1.default();
        this.adminVerifyVendorsWarehouse = async (request, response) => {
            const vendorId = request.params.vendorId;
            const warehouseId = request.params.warehouseId;
            try {
                const verifiedWarehouse = await this.adminVendorWarehouseService.verifyVendorsWarehouse(vendorId, warehouseId);
                response.send(verifiedWarehouse);
            }
            catch (error) {
                response.send(error);
            }
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/verify/:vendorId/:warehouseId`, this.adminVerifyVendorsWarehouse);
    }
}
exports.default = AdminVendorWarehouseController;
