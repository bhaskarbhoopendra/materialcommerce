import VerifiedStatus from "../enums/enums.vendor";
import UserDTO from "../user/user.dto";
import { IsString, IsEnum, IsBoolean, IsOptional } from "class-validator";

class vendorDto {
  @IsString()
  id?: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

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
