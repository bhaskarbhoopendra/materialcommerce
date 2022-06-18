import IZone from "./zone.interface";
import ZoneModel from "./zone.model";

class ZoneDbManager {
  zone = ZoneModel;
  constructor() {}
  getAllZone = async () => {
    return await this.zone.find({}).lean();
  };

  updateZoneById = async (id: string, zone: IZone) => {
    return await this.zone.findByIdAndUpdate(id, zone, { new: true });
  };
}

export default ZoneDbManager;
