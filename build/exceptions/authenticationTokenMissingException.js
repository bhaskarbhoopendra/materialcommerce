"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = __importDefault(require("./HttpException"));
class AuthenticationTokenMissingException extends HttpException_1.default {
    constructor() {
        super(401, "Authentication token missing");
    }
}
exports.default = AuthenticationTokenMissingException;
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
