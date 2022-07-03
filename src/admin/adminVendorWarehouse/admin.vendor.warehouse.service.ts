export default class AdminVendorWarehouseService {
  constructor() {}

  verifyVendorsWarehouse = async (vendorId: string, warehouseId: string) => {
    const data = { vendorId, warehouseId };
    return data;
  };
}
