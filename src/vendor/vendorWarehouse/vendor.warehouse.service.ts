import WarehouseDbManager from "../../warehouse/warehouse.dbmanager";
import WarehouseDTo from "../../warehouse/warehouse.dto";

class VendorWarehouseService {
  warehouseDbManager = new WarehouseDbManager();
  constructor() {}

  public vendorCreateWarehouseService = async (
    vendorId: string,
    warehouseData: WarehouseDTo
  ) => {
    const newWarehouseData = {
      ...warehouseData,
      vendor: vendorId,
    };

    const vendorCreatedWarehouse =
      await this.warehouseDbManager.createWarehouse(newWarehouseData);

    return vendorCreatedWarehouse;
  };
}

export default VendorWarehouseService;
