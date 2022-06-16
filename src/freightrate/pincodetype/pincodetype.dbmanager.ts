import PincodeTypeModel from "./pincodetype.model";

class PincodeTypeDbManager {
  pincodeTypeModel = PincodeTypeModel;
  constructor() {}

  getAllPinocdeType = async () => {
    return await this.pincodeTypeModel.find({}).lean();
  };
}

export default PincodeTypeDbManager;
