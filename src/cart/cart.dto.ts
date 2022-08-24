import { IsNumber, IsString } from "class-validator";

export class CartDto {
  @IsNumber()
  quantity: number;

  @IsString()
  proudct: string;
}
