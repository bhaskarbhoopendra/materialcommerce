import FreightRateDto from "./freightrate.dto";
import FreightRateModel from "./freightrate.model";

export default class FreightRateDbManager {
  freightratemodel = FreightRateModel;
  constructor() {}

  createFreightRate = async (data: FreightRateDto) => {
    return await this.freightratemodel.create({ ...data });
  };
}
