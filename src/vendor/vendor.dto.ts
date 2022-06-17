import VerifiedStatus from "../enums/enums.vendor";
import UserDTO from "../user/user.dto";
import { IsString, IsEnum, IsBoolean, IsOptional } from "class-validator";


class vendorDto extends UserDTO {

  @IsString()
  organisation: string;

  @IsString()
  company: string;

  @IsEnum(VerifiedStatus)
  isConfirmedVendor: VerifiedStatus;

  @IsBoolean()
  isVendor: boolean;

  @IsOptional()
  @IsString()
  warehouse: string;


}

export default vendorDto;