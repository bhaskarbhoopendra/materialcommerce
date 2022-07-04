import UserWithThatEmailAlreadyExistsException from "../exceptions/userWithThatEmailAlreadyExistsException";
import UserModel from "../user/user.model";
import * as bcrypt from "bcryptjs";
import UserDbManager from "../user/user.dbmanager";
import IUser from "../user/user.interface";
import TokenData from "../interfaces/takenData.interface";
import * as jwt from "jsonwebtoken";
import DataStoredInToken from "../interfaces/dataStoredInToken.interface";
import WrongCredentialsException from "../exceptions/wrongCredentialsException";
import loginDto from "./login.dto";
import UserDTO from "../user/user.dto";
class AuthenticationService {
  user = UserModel;
  userDbManager = new UserDbManager();

  constructor() {}

  register = async (data: UserDTO): Promise<any> => {
    const { email, password } = data;
    const foundUser = await this.user.findOne({ email: email });
    if (foundUser) throw new UserWithThatEmailAlreadyExistsException(email);
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      ...data,
      password: hashedPassword,
    };
    const user = await this.user.create({ ...newUser });
    const tokenData = this.createToken(user);
    return {
      user,
      tokenData,
    };
  };

  login = async (userData: loginDto): Promise<any> => {
    const { email, password } = userData;
    const user = await this.user.findOne({ email });
    if (!user) throw new WrongCredentialsException();
    const comparePasswords = await bcrypt.compare(
      password,
      user.get("password", null, { getters: false })
    );
    const tokenData = this.createToken(user);
    return { user, tokenData };
  };

  createToken = (user: IUser) => {
    const expiresIn = 60 * 60;
    const { JWT_SECRET } = process.env;
    const dataStoredInToken: DataStoredInToken = {
      _id: user._id,
    };
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, `${JWT_SECRET}`, { expiresIn }),
    };
  };

  createCookie = (tokenData: TokenData) => {
    return `Authorization=${tokenData.token} ; HttpOnly; Max-Age=${tokenData.expiresIn} `;
  };
}

export default AuthenticationService;
