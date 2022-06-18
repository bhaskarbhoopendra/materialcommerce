import { IsBoolean, IsString } from "class-validator";

class PincodeTypeDto {
  @IsString()
  pincodeTypeName: String;

  @IsBoolean()
  isSpecialState: boolean;
}

export default PincodeTypeDto;
