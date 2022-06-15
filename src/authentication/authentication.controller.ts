import { Router, Request, Response } from "express";
import Controller from "../interfaces/controller.interface";
import userDto from "../user/user.dto";
import authenticationService from "./authentication.service";


class authenticationController implements Controller {

  public path = "/auth";
  public router = Router();
  authenticationService = new authenticationService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = () => {

    this.router.post(`${this.path}/register`, this.registerUser);
    this.router.post(`${this.path}/login`, this.userLogin);
    this.router.post(`${this.path}/logout`, this.userLogout);
  }

  private registerUser = async (req: Request, res: Response) => {

    const userData: userDto = req.body;
    try {
      const { user, cookie } = await this.authenticationService.register(userData);
      res.setHeader('Set-Cookie', [cookie]);
      res.send({ user });

    } catch (error) {
      return error;
    }
  }

  private userLogin = async (req: Request, res: Response) => {

    const loginCred: any = req.body;
    try {
      const email = loginCred.email;
      const password = loginCred.password;
      if (email === null || email === undefined || password === null || password === undefined)
        res.send("invalid input");
      const { user, cookie, tokenData } = await this.authenticationService.login(loginCred);

      res.setHeader('Set-Cookie', [cookie]);
      res.send({ user, tokenData });

    } catch (error) {
      return error;
    }
  }

  private userLogout = async (req: Request, res: Response) => {
    try {
      res.setHeader('Set-Cookie', ['Authorization=,Max-Age=0']);
      res.send("logged out");

    } catch (error) {
      return error;
    }

  }
}

export default authenticationController;