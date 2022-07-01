"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pincodetype_model_1 = __importDefault(require("./pincodetype.model"));
class PincodeTypeController {
    constructor() {
        this.path = "/pincodetype";
        this.router = (0, express_1.Router)();
        this.initialiseRoutes();
    }
    initialiseRoutes() {
        this.router.post(`${this.path}/create`, this.createPincode);
    }
    async createPincode(request, response) {
        const pincodeTypeData = request.body;
        try {
            const pincodeType = await pincodetype_model_1.default.create(Object.assign({}, pincodeTypeData));
            response.send(pincodeType);
        }
        catch (error) { }
    }
}
exports.default = PincodeTypeController;
