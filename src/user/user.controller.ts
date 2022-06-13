import { Router } from "express";
import Controller from "../interfaces/controller.interface";

class UserController implements Controller {
  public path = "/user";
  public router: Router = Router();
}

export default UserController;
