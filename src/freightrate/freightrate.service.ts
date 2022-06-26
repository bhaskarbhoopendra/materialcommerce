import FreightRateDbManager from "./freightrate.dbmanager";
import FreightRateDto from "./freightrate.dto";
import FreightRateModel from "./freightrate.model";

export default class FreigthRateService {
  freightRatemodel = FreightRateModel;
  freightRateDbManger = new FreightRateDbManager();
  constructor() {}

  createFreightRateService = async (
    zoneId: string,
    pincodeTypeId: string,
    freightRateData: FreightRateDto
  ): Promise<FreightRateDto> => {
    const { weightType, lowerbound, upperbound, rate } = freightRateData;
    const newFreightRate = {
      zone: zoneId,
      pincodeType: pincodeTypeId,
      weightType: weightType,
      lowerbound: lowerbound,
      upperbound: upperbound,
      rate: rate,
    };
    const freightRate = await this.freightRateDbManger.createFreightRate(
      newFreightRate
    );
    return freightRate;
  };
}
