"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userWithThatEmailAlreadyExistsException_1 = __importDefault(require("../exceptions/userWithThatEmailAlreadyExistsException"));
const vendor_dbmanager_1 = __importDefault(require("./vendor.dbmanager"));
const vendor_service_1 = __importDefault(require("./vendor.service"));
class VendorController {
    constructor() {
        this.path = 'vendor';
        this.router = (0, express_1.Router)();
        this.vendorDbManager = new vendor_dbmanager_1.default();
        this.vendorService = new vendor_service_1.default();
        this.registerVendor = async (request, response) => {
            try {
                const vendorData = request.body;
                let vendorEmail = vendorData.email;
                let vendor = await this.vendorDbManager.findVendorByEmail(vendorEmail);
                if (vendor)
                    throw new userWithThatEmailAlreadyExistsException_1.default(vendorEmail);
                const createdVendor = await this.vendorService.createVendor(vendorData);
                console.log(createdVendor);
                response.send({ createdVendor });
            }
            catch (error) {
                return error;
            }
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/register`, this.registerVendor);
    }
}
exports.default = VendorController;
