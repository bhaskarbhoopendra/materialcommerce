import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { userInfo } from "os";
import AuthenticationTokenMissingException from "../exceptions/authenticationTokenMissingException";
import VendorNotFoundException from "../exceptions/VendorNotFoundException";
import WrongAuthenticationTokenException from "../exceptions/wrongAuthenticationTokenException";
import DataStoredInToken from "../interfaces/dataStoredInToken.interface";
import VerifiedStatus from "../enums/enums.vendor";
import vendorModel from "../vendor/vendor.model";

async function confirmedVendorMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const cookies = request.cookies;
  if (cookies && cookies.Authentication) {
    const { JWT_SECRET } = process.env;
    try {
      const verificationResponse = jwt.verify(
        `${JWT_SECRET}`,
        cookies.Authorization
      ) as DataStoredInToken;
      const id = verificationResponse._id;
      const vendor: any = await vendorModel.findById(id);
      if (!vendor) throw new VendorNotFoundException(id);
      if (vendor.isConfirmedVendor !== VerifiedStatus.CONFIRMED)
        throw new WrongAuthenticationTokenException();
      request.user = vendor;
      next();
    } catch (error) {
      return error;
    }
  } else {
    next(new AuthenticationTokenMissingException());
  }
}

export default confirmedVendorMiddleware;
