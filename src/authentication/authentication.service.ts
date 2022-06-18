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
class AuthenticationService {
  user = UserModel;
  userDbManager = new UserDbManager();

  constructor() {}

  register = async (userData: any): Promise<any> => {
    try {
      const email = userData.email;
      const password = userData.password;
      if (await this.user.findOne({ email }))
        throw new UserWithThatEmailAlreadyExistsException(email);

      const hashedPassword = await bcrypt.hash(password, 10);

      const user: IUser = await this.userDbManager.createUser({
        ...userData,
        password: hashedPassword,
      });

      const tokenData: TokenData = this.createToken(user);
      const cookie = this.createCookie(tokenData);

      return {
        user,
        cookie,
      };
    } catch (error) {
      return error;
    }
  };

  login = async (userCred: loginDto): Promise<any> => {
    const email: string = userCred.email;
    const password: string = userCred.password;

    const user: IUser | null = await this.user.findOne({ email }).lean();
    if (!user) throw new WrongCredentialsException();

    const passwordHash = user.password;
    const comparePasswords = bcrypt.compare(password, passwordHash);
    if (!comparePasswords) throw new WrongCredentialsException();

    const tokenData = this.createToken(user);
    const cookie = this.createCookie(tokenData);

    return { user, tokenData, cookie };
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
