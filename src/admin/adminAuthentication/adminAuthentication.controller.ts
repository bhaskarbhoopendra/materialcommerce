import { Router, Request, Response, NextFunction } from "express";
import Controller from "../../interfaces/controller.interface";
import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import AdminModel from "../admin.model";
import CreateAdminDto from "./createAdmin.dto";
import AdminauthenticateService from "./admin.authenticate.service";
import LogInDto from "../../authentication/login.dto";
import Iadmin from "./admin.interface";
import TokenData from "../../interfaces/takenData.interface";
import DataStoredInToken from "../../interfaces/dataStoredInToken.interface";
import WrongCredentialsException from "../../exceptions/wrongCredentialsException";

class AdminAuthenticationController implements Controller {
  public path = "/admin";
  public router = Router();
  public admin = AdminModel;
  public adminAuthenticateService = new AdminauthenticateService();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/register`, this.adminRegister);
    this.router.post(`${this.path}/login`, this.adminLogin);
    this.router.post(`${this.path}/logout`, this.adminLogout);
  }

  private adminRegister = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const adminData: CreateAdminDto = request.body;
    try {
      const { cookie, admin } = await this.adminAuthenticateService.register(
        adminData
      );
      response.setHeader("Set-Cookie", [cookie]);
      response.send(admin);
    } catch (error) {
      next(error);
    }
  };

  private adminLogin = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const logInData: LogInDto = request.body;
      const admin = await this.admin.findOne({ email: logInData.email });
      if (admin) {
        const isPasswordMatching = await bcrypt.compare(
          logInData.password,
          admin.get("password", null, { getters: false })
        );
        if (isPasswordMatching) {
          const tokenData = this.createToken(admin);
          response.setHeader("Set-Cookie", [this.createCookie(tokenData)]);
          response.send({ tokenData, admin });
        } else {
          next(new WrongCredentialsException());
        }
      } else {
        next(new WrongCredentialsException());
      }
    } catch (error) {
      return error;
    }
  };

  private adminLogout = (request: Request, response: Response) => {
    try {
      response.setHeader("Set-Cookie", ["Authorization=;Max-Age=0"]);
      response.send("Logged Out");
    } catch (error) {
      return error;
    }
  };

  private createCookie(tokenData: TokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }

  public createToken(admin: Iadmin): TokenData {
    const expiresIn = 60 * 60; // an hour
    const { JWT_SECRET } = process.env;
    const dataStoredInToken: DataStoredInToken = {
      _id: admin._id,
    };
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, `${JWT_SECRET}`, { expiresIn }),
    };
  }
}

export default AdminAuthenticationController;
