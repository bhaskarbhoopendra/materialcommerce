import { Router } from "express";
import Controller from "../interfaces/controller.interface";

class AdminController implements Controller {
  public path = "/admin";
  public router = Router();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/register`, this.adminRegister);
  }

  private adminRegister = () => {};
}

export default AdminController;
