"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const admin_controller_1 = __importDefault(require("./admin/admin.controller"));
const adminAuthentication_controller_1 = __importDefault(require("./admin/adminAuthentication/adminAuthentication.controller"));
const app_1 = __importDefault(require("./app"));
const authentication_controller_1 = __importDefault(require("./authentication/authentication.controller"));
const pincodetype_controller_1 = __importDefault(require("./freightrate/pincodetype/pincodetype.controller"));
const zone_controller_1 = __importDefault(require("./freightrate/zone/zone.controller"));
const googleauth_controller_1 = __importDefault(require("./googleauth/googleauth.controller"));
<<<<<<< HEAD
const vendor_authentication_controller_1 = __importDefault(require("./vendor/vendor.authentication.controller"));
=======
const warehouse_controller_1 = __importDefault(require("./warehouse/warehouse.controller"));

>>>>>>> 135794992db1dba16263e7946e01adcb0c41a84c
const app = new app_1.default([
    new googleauth_controller_1.default(),
    new adminAuthentication_controller_1.default(),
    new zone_controller_1.default(),
    new pincodetype_controller_1.default(),
    new authentication_controller_1.default(),
<<<<<<< HEAD
    new vendor_authentication_controller_1.default()
=======
    new warehouse_controller_1.default(),
    new admin_controller_1.default()
>>>>>>> 135794992db1dba16263e7946e01adcb0c41a84c
]);

app.listen();
