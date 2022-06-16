"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const adminAuthentication_controller_1 = __importDefault(require("./admin/adminAuthentication/adminAuthentication.controller"));
const app_1 = __importDefault(require("./app"));
const authentication_controller_1 = __importDefault(require("./authentication/authentication.controller"));
const pincodetype_controller_1 = __importDefault(require("./freightrate/pincodetype/pincodetype.controller"));
const zone_controller_1 = __importDefault(require("./freightrate/zone/zone.controller"));
const googleauth_controller_1 = __importDefault(require("./googleauth/googleauth.controller"));
const app = new app_1.default([
    new googleauth_controller_1.default(),
    new adminAuthentication_controller_1.default(),
    new zone_controller_1.default(),
    new pincodetype_controller_1.default(),
    new authentication_controller_1.default()
]);
app.listen();
