"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_middleware_1 = __importDefault(require("../../middleware/admin.middleware"));
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
        this.allVendors = async (request, response) => {
            try {
                const { unconfrimedVendors, confrimedVendors } = await this.adminVendorWarehouseService.getAllVendorsService();
                response.send({ unconfrimedVendors, confrimedVendors });
            }
            catch (error) {
                response.send(error);
            }
        };
        this.deleteOneVendor = async (request, response) => {
            try {
                const vendorId = request.params.vendorId;
                if (vendorId == undefined)
                    response.send("vendor id not found");
                const deletedVendor = await this.adminVendorWarehouseService.deleteOneVendorService(vendorId);
                response.send(deletedVendor);
            }
            catch (error) { }
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/verify/:vendorId/:warehouseId`, admin_middleware_1.default, this.adminVerifyVendorsWarehouse);
        this.router.get(`${this.path}/confrimed/unconfrimedvendor`, admin_middleware_1.default, this.allVendors);
        this.router.delete(`${this.path}/:vendorId`, admin_middleware_1.default, this.deleteOneVendor);
    }
}
exports.default = AdminVendorWarehouseController;
