import FreightRateDto from "./freightrate.dto";
import FreightRateModel from "./freightrate.model";

export default class FreightRateDbManager {
  freightratemodel = FreightRateModel;
  constructor() {}

  createFreightRate = async (data: FreightRateDto) => {
    return await this.freightratemodel.create({ ...data });
  };

  updateFreightRate = async (
    freightRateId: string,
    freightRateData: FreightRateDto
  ): Promise<any> => {
    return await this.freightratemodel.findByIdAndUpdate(
      freightRateId,
      { ...freightRateData },
      { new: true }
    );
  };

  deleteFreightRate = async (freightRateId: string) => {
    return await this.freightratemodel.findByIdAndDelete(freightRateId);
  };

  getAllFreightRate = async () => {
    return await this.freightratemodel.find({});
  };
}
