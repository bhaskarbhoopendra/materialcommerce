import { IsArray, IsNumber, IsString } from "class-validator";

class UserDTO {
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

  @IsNumber()
  phoneNumber: number;

  @IsString()
  source: string;

  @IsString()
  lastVisited: string;

  @IsArray()
  wishlist: [string];

  @IsArray()
  cart: [string];
}

export default UserDTO;
