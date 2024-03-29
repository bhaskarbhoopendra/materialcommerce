"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enums_vendor_1 = __importDefault(require("../enums/enums.vendor"));
const vendor_model_1 = __importDefault(require("./vendor.model"));
class VendorDbManager {
    constructor() {
        this.vendor = vendor_model_1.default;
        this.createVendor = async (data) => {
            return await this.vendor.create(data);
        };
        this.findVendorById = async (id) => {
            return await this.vendor.findById(id);
        };
        this.findAllVendors = async () => {
            return await this.vendor.find({}).lean();
        };
        this.findVendorByEmail = async (email) => {
            return await this.vendor.findOne({ email: email });
        };
        this.updateVendorById = async (id, data) => {
            return await this.vendor.findByIdAndUpdate(id, data, { new: true });
        };
        this.deleteVendorById = async (id) => {
            return await this.vendor.findByIdAndDelete(id);
        };
        this.confirmedVendor = async () => {
            return await this.vendor
                .find({
                isConfirmedVendor: enums_vendor_1.default.CONFIRMED,
            })
                .lean();
        };
        this.unconfrimedVendors = async () => {
            return await this.vendor
                .find({
                isConfirmedVendor: enums_vendor_1.default.PENDING,
            })
                .lean();
        };
    }
}
exports.default = VendorDbManager;
