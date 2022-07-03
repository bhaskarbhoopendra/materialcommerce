"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enums_vendor_1 = __importDefault(require("../../enums/enums.vendor"));
const VendorNotFoundException_1 = __importDefault(require("../../exceptions/VendorNotFoundException"));
const WarehouseNotFoundException_1 = __importDefault(require("../../exceptions/WarehouseNotFoundException"));
const vendor_dbmanager_1 = __importDefault(require("../../vendor/vendor.dbmanager"));
const warehouse_dbmanager_1 = __importDefault(require("../../warehouse/warehouse.dbmanager"));
class AdminVendorWarehouseService {
    constructor() {
        this.vendorDbManager = new vendor_dbmanager_1.default();
        this.warehouseDbManager = new warehouse_dbmanager_1.default();
        this.verifyVendorsWarehouse = async (vendorId, warehouseId) => {
            var _a;
            const foundVendor = await this.vendorDbManager.findVendorById(vendorId);
            if (!foundVendor)
                throw new VendorNotFoundException_1.default(vendorId);
            const foundWarehouse = await this.warehouseDbManager.warehouseByID(warehouseId);
            if (!foundWarehouse)
                throw new WarehouseNotFoundException_1.default(warehouseId);
            if (foundVendor.isConfirmedVendor == enums_vendor_1.default.CONFIRMED &&
                foundVendor.id == foundWarehouse.vendor) {
                const confirmedWarehouse = await this.warehouseDbManager.warehouseByIDAndUpdate(warehouseId, {
                    isVerifiedWarehouse: enums_vendor_1.default.CONFIRMED,
                });
                //    checking for existing warehouse
                // TODO could be optimised TC O(n) for inclused
                if (foundVendor.warehouse.includes(warehouseId)) {
                    return "Warehouse Already exists";
                }
                else {
                    (_a = foundVendor === null || foundVendor === void 0 ? void 0 : foundVendor.warehouse) === null || _a === void 0 ? void 0 : _a.push(warehouseId);
                    await foundVendor.save();
                    return { confirmedWarehouse, foundVendor };
                }
            }
        };
    }
}
exports.default = AdminVendorWarehouseService;
