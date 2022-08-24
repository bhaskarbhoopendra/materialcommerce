import { IsString } from "class-validator";

export default class PropertyDto {
  @IsString()
  propertyname: string;
}
