"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AdminVendorWarehouseService {
    constructor() {
        this.verifyVendorsWarehouse = async (vendorId, warehouseId) => {
            const data = { vendorId, warehouseId };
            return data;
        };
    }
}
exports.default = AdminVendorWarehouseService;
