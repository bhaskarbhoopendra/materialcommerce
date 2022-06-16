"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pincodetype_dbmanager_1 = __importDefault(require("./pincodetype.dbmanager"));
const pincodetype_model_1 = __importDefault(require("./pincodetype.model"));
class PincodeTypeController {
    constructor() {
        this.path = "/pincodetype";
        this.router = (0, express_1.Router)();
        this.pincodeTypeModel = pincodetype_model_1.default;
        this.pincodeTypeDbManager = new pincodetype_dbmanager_1.default();
        this.createPincodeType = async (request, response) => {
            const pincodeTypeData = request.body;
            try {
                const pincodeType = await this.pincodeTypeModel.create(Object.assign({}, pincodeTypeData));
                response.send(pincodeType);
            }
            catch (error) {
                console.log(error);
            }
        };
        this.getAllPincodeType = async (request, response) => {
            try {
                const pincodetypes = await this.pincodeTypeDbManager.getAllPinocdeType();
                response.send(pincodetypes);
            }
            catch (error) {
                console.log(error);
            }
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/create`, this.createPincodeType);
        this.router.get(`${this.path}/`, this.getAllPincodeType);
    }
}
exports.default = PincodeTypeController;
