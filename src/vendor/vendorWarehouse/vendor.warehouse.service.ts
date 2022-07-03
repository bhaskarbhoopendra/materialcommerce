import WarehouseDbManager from "../../warehouse/warehouse.dbmanager";
import WarehouseDTo from "../../warehouse/warehouse.dto";

export default class VendorWarehouseService {
  warehouseDbManager = new WarehouseDbManager();
  constructor() {}

  vendorCreateWarehouseService = async (
    vendorId: string,
    warehouseData: WarehouseDTo
  ) => {
    const newWarehouse = {
      ...warehouseData,
      vendor: vendorId,
    };

    const vendorCreatedWarehouse =
      await this.warehouseDbManager.createWarehouse(newWarehouse);
    return vendorCreatedWarehouse;
  };

  getWarehouse = async () => {
    const warehouse = await this.warehouseDbManager.getAllWarehouse();
    return warehouse;
  };
}
