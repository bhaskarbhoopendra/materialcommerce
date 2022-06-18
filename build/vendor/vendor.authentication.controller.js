"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vendor_dbmanager_1 = __importDefault(require("./vendor.dbmanager"));
const vendor_authentication_service_1 = __importDefault(require("./vendor.authentication.service"));
class VendorAuthenticationController {
    constructor() {
        this.path = '/vendor';
        this.router = (0, express_1.Router)();
        this.vendorDbManager = new vendor_dbmanager_1.default();
        this.vendorAuthenticationService = new vendor_authentication_service_1.default();
        this.registerVendor = async (request, response, next) => {
            try {
                const data = request.body;
                const { cookie, createdVendor } = await this.vendorAuthenticationService.register(data);
                response.setHeader("Set-Cookie", [cookie]);
                response.send({ createdVendor });
            }
            catch (error) {
                next(error);
            }
        };
        this.loginVendor = async (request, response, next) => {
            try {
                const vendorCred = request.body;
                const { tokenData, cookie, vendor } = await this.vendorAuthenticationService.login(vendorCred);
                response.setHeader("Set-Cookie", [cookie]);
                response.send({
                    tokenData,
                    vendor
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/register`, this.registerVendor);
        this.router.post(`${this.path}/login`, this.loginVendor);
    }
}
exports.default = VendorAuthenticationController;
