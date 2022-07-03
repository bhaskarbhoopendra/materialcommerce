import WarehouseDbManager from "../../warehouse/warehouse.dbmanager";
import WarehouseDTo from "../../warehouse/warehouse.dto";
import VendorDbManager from "../vendor.dbmanager";

class VendorWarehouseService {
  warehouseDbManager = new WarehouseDbManager();
  vendorDbManager = new VendorDbManager();
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
