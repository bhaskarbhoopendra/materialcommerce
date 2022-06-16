import HttpException from "./HttpException";

class AuthenticationTokenMissingException extends HttpException {
  constructor() {
    super(401, "Authentication token missing");
  }
}

export default AuthenticationTokenMissingException;

// import { Router, Request, Response } from "express";
// import Controller from "../../interfaces/controller.interface";

// class PincodeTypeController implements Controller {
//   path = "/pincodetype";
//   router = Router();
//   constructor() {
//     this.initializeRoutes();
//   }

//   private initializeRoutes() {
//     this.router.post(`${this.path}/create`, this.createPincodeType);
//   }

//   private createPincodeType = async (
//     request: Request,
//     response: Response
//   ) => {};
// }
