"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const enums_vendor_1 = __importDefault(require("../enums/enums.vendor"));
const VendorNotFoundException_1 = __importDefault(require("../exceptions/VendorNotFoundException"));
const admin_middleware_1 = __importDefault(require("../middleware/admin.middleware"));
const vendor_dbmanager_1 = __importDefault(require("../vendor/vendor.dbmanager"));
class AdminController {
    constructor() {
        this.path = "/admin";
        this.router = (0, express_1.Router)();
        this.vendorDbManager = new vendor_dbmanager_1.default();
        this.adminVerifyVendor = async (request, response) => {
            const vendorId = request.params.vendorId;
            if (vendorId == undefined)
                throw new VendorNotFoundException_1.default(vendorId);
            try {
                const confirmedvendor = await this.vendorDbManager.updateVendorById(vendorId, {
                    isConfirmedVendor: enums_vendor_1.default.CONFIRMED,
                });
                response.send(confirmedvendor);
            }
            catch (error) {
                response.send(error);
            }
        };
        this.admingGetVendor = async (request, response) => {
            try {
                const vendorId = request.params.vendorId;
                if (vendorId == undefined)
                    throw new VendorNotFoundException_1.default(vendorId);
                const vendor = await this.vendorDbManager.findVendorById(vendorId);
                response.send(vendor);
            }
            catch (error) {
                response.send(error);
            }
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/verifyvendor/:vendorId`, admin_middleware_1.default, this.adminVerifyVendor);
        this.router.get(`${this.path}/getvendor/:vendorId`, admin_middleware_1.default, this.admingGetVendor);
    }
}
exports.default = AdminController;
