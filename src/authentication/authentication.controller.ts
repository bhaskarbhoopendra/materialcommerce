import { Router, Request, Response, NextFunction } from "express";
import UserWithThatEmailAlreadyExistsException from "../exceptions/userWithThatEmailAlreadyExistsException";
import Controller from "../interfaces/controller.interface";
import userDto from "../user/user.dto";
import AuthenticationService from "./authentication.service";
import loginDto from "./login.dto";
import * as bcrypt from "bcryptjs";
import UserModel from "../user/user.model";
import UserDbManager from "../user/user.dbmanager";
import IUser from "../user/user.interface";

class AuthenticationController implements Controller {
  public path = "/auth";
  public router = Router();
  user = UserModel;
  userDbManager = new UserDbManager();
  authenticationService = new AuthenticationService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    this.router.post(`${this.path}/register`, this.registerUser);
    this.router.post(`${this.path}/login`, this.userLogin);
    this.router.post(`${this.path}/logout`, this.userLogout);
  };

  private registerUser = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data: userDto = request.body;
      const { user, tokenData } = await this.authenticationService.register(
        data
      );
      response.cookie("Authorization", `${tokenData.token}`, {
        expires: new Date(Date.now() + 900000),
        httpOnly: true,
      });
      response.send(user);
    } catch (error) {
      next(error);
    }
  };

  private userLogin = async (request: Request, response: Response) => {
    const userData: loginDto = request.body;
    try {
      const { user, tokenData } = await this.authenticationService.login(
        userData
      );
      response.cookie("Authorization", `${tokenData.token}`, {
        expires: new Date(Date.now() + 900000),
        httpOnly: true,
      });
      response.send({ user });
    } catch (error) {
      return error;
    }
  };

  private userLogout = (request: Request, response: Response) => {
    try {
      response.setHeader("Set-Cookie", ["Authorization=,Max-Age=0"]);
      response.send("logged out");
    } catch (error) {
      return error;
    }
  };
}

export default AuthenticationController;
