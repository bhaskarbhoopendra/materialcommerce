import { Router, Request, Response } from "express";
import Controller from "../interfaces/controller.interface";
import userDto from "../user/user.dto";
import AuthenticationService from "./authentication.service";
import loginDto from "./login.dto";


class AuthenticationController implements Controller {

  public path = "/auth";
  public router = Router();
  authenticationService = new AuthenticationService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = () => {

    this.router.post(`${this.path}/register`, this.registerUser);
    this.router.post(`${this.path}/login`, this.userLogin);
    this.router.post(`${this.path}/logout`, this.userLogout);
  }

  private registerUser = async (request: Request, response: Response) => {

    const userData: userDto = request.body;
    try {
      const { user, cookie } = await this.authenticationService.register(userData);
      response.setHeader('Set-Cookie', [cookie]);
      response.send({ user });

    } catch (error) {
      return error;
    }
  }

  private userLogin = async (request: Request, response: Response) => {

    const loginCred: loginDto = request.body;
    try {
      const email = loginCred.email;
      const password = loginCred.password;
      if (email === null || email === undefined || password === null || password === undefined)
        response.send("invalid input");
      const { user, cookie, tokenData } = await this.authenticationService.login(loginCred);

      response.setHeader('Set-Cookie', [cookie]);
      response.send({ user, tokenData });

    } catch (error) {
      return error;
    }
  }

  private userLogout = (request: Request, response: Response) => {
    try {
      response.setHeader('Set-Cookie', ['Authorization=,Max-Age=0']);
      response.send("logged out");

    } catch (error) {
      return error;
    }

  }
}

export default AuthenticationController;