import VerifiedStatus from "../../enums/enums.vendor";
import VendorNotFoundException from "../../exceptions/VendorNotFoundException";
import WarehouseNotFoundException from "../../exceptions/WarehouseNotFoundException";
import VendorDbManager from "../../vendor/vendor.dbmanager";
import WarehouseDbManager from "../../warehouse/warehouse.dbmanager";

export default class AdminVendorWarehouseService {
  vendorDbManager = new VendorDbManager();
  warehouseDbManager = new WarehouseDbManager();
  constructor() {}

  verifyVendorsWarehouse = async (vendorId: string, warehouseId: string) => {
    const foundVendor: any = await this.vendorDbManager.findVendorById(
      vendorId
    );
    if (!foundVendor) throw new VendorNotFoundException(vendorId);
    const foundWarehouse = await this.warehouseDbManager.warehouseByID(
      warehouseId
    );
    if (!foundWarehouse) throw new WarehouseNotFoundException(warehouseId);

    if (
      foundVendor.isConfirmedVendor == VerifiedStatus.CONFIRMED &&
      foundVendor.id == foundWarehouse.vendor
    ) {
      const confirmedWarehouse =
        await this.warehouseDbManager.warehouseByIDAndUpdate(warehouseId, {
          isVerifiedWarehouse: VerifiedStatus.CONFIRMED,
        });
      //    checking for existing warehouse
      // TODO could be optimised TC O(n) for inclused
      if (foundVendor.warehouse.includes(warehouseId)) {
        return "Warehouse Already exists";
      } else {
        foundVendor?.warehouse?.push(warehouseId);
        await foundVendor.save();
        return { confirmedWarehouse, foundVendor };
      }
    }
  };

  getAllVendorsService = async () => {
    const confrimedVendors = await this.vendorDbManager.confirmedVendor();
    const unconfrimedVendors = await this.vendorDbManager.unconfrimedVendors();
    return { unconfrimedVendors, confrimedVendors };
  };
}
