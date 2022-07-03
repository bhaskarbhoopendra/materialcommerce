import vendorDto from "./vendor.dto";
import VendorDbManager from "./vendor.dbmanager";
import * as bcrypt from "bcryptjs";
import UserWithThatEmailAlreadyExistsException from "../exceptions/userWithThatEmailAlreadyExistsException";
import DataStoredInToken from "../interfaces/dataStoredInToken.interface";
import TokenData from "../interfaces/takenData.interface";
import * as jwt from "jsonwebtoken";
import LoginDto from "../authentication/login.dto";
import WrongCredentialsException from "../exceptions/wrongCredentialsException";
import VendorModel from "./vendor.model";

class VendorService {
  vendorDbManager = new VendorDbManager();
  vendor = VendorModel;
  constructor() {}

  register = async (data: vendorDto) => {
    const email = data.email;
    const vendor = await this.vendor.findOne({ email: email });

    if (vendor) throw new UserWithThatEmailAlreadyExistsException(email);

    const password = data.password;
    const hashedPassword = await bcrypt.hash(password, 10);

    const createdVendor = await this.vendorDbManager.createVendor({
      ...data,
      password: hashedPassword,
    });

    const tokenData = this.createToken(createdVendor);
    const cookie = this.createCookie(tokenData);

    return {
      createdVendor,
      cookie,
    };
  };

  login = async (userCred: LoginDto): Promise<any> => {
    try {
      const email: string = userCred.email;
      const password: string = userCred.password;

      const vendor = await this.vendorDbManager.findVendorByEmail(email);

      if (!vendor) throw new WrongCredentialsException();
      const isValidPassword = await bcrypt.compare(
        password,
        vendor.get("password", null, { getters: false })
      );
      if (!isValidPassword) throw new WrongCredentialsException();

      const tokenData = this.createToken(vendor);
      const cookie = this.createCookie(tokenData);

      return {
        tokenData,
        cookie,
        vendor,
      };
    } catch (error) {
      console.log(error);
    }
  };

  createToken = (createdVendor: any): TokenData => {
    const expiresIn = 60 * 60;
    const { JWT_SECRET } = process.env;
    const dataStoredInToken: DataStoredInToken = { _id: createdVendor._id };
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, `${JWT_SECRET}`, { expiresIn }),
    };
  };

  createCookie = (tokenData: TokenData) => {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn} `;
  };
}

export default VendorService;
