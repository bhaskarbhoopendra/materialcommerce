import { IsString } from "class-validator/types/decorator/typechecker/IsString";

class LoginDto {
  @IsString()
  email: string;

  @IsString()
  password: string
}

export default LoginDto;
