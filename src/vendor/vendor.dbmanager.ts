import vendorDto from "./vendor.dto";
import Ivendor from "./vendor.interface";
import VendorModel from "./vendor.model";

class VendorDbManager {
  private id: string;
  private data: vendorDto;
  private email: string;

  vendor = VendorModel;
  constructor() {}

  createVendor = async (data: vendorDto) => {
    return await this.vendor.create(data);
  };

  findVendorById = async (id: string) => {
    return await this.vendor.findById(id);
  };

  findAllVendors = async () => {
    return await this.vendor.find({}).lean();
  };

  findVendorByEmail = async (email: string) => {
    return await this.vendor.findOne({ email: email });
  };

  updateVendorById = async (id: string, data: any) => {
    return await this.vendor.findByIdAndUpdate(id, data, { new: true });
  };

  deleteVendorById = async (id: string) => {
    return await this.vendor.findByIdAndDelete(id);
  };
}

export default VendorDbManager;
