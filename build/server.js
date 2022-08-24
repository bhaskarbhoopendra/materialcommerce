"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const admin_controller_1 = __importDefault(require("./admin/admin.controller"));
const adminAuthentication_controller_1 = __importDefault(require("./admin/adminAuthentication/adminAuthentication.controller"));
const admin_product_controller_1 = __importDefault(require("./admin/adminProduct/admin.product.controller"));
const admin_vendor_warehouse_controller_1 = __importDefault(require("./admin/adminVendorWarehouse/admin.vendor.warehouse.controller"));
const app_1 = __importDefault(require("./app"));
const authentication_controller_1 = __importDefault(require("./authentication/authentication.controller"));
const blog_controller_1 = __importDefault(require("./blog/blog.controller"));
const cart_controller_1 = __importDefault(require("./cart/cart.controller"));
const category_controller_1 = __importDefault(require("./categories/category/category.controller"));
const subcateogry_controller_1 = __importDefault(require("./categories/sub-category/subcateogry.controller"));
const freightrate_controller_1 = __importDefault(require("./freightrate/freightrate.controller"));
const pincodetype_controller_1 = __importDefault(require("./freightrate/pincodetype/pincodetype.controller"));
const zone_controller_1 = __importDefault(require("./freightrate/zone/zone.controller"));
const googleauth_controller_1 = __importDefault(require("./googleauth/googleauth.controller"));
const product_controller_1 = __importDefault(require("./product/product.controller"));
const vendor_authentication_controller_1 = __importDefault(require("./vendor/vendor.authentication.controller"));
const vendor_warehouse_controller_1 = __importDefault(require("./vendor/vendorWarehouse/vendor.warehouse.controller"));
const warehouse_controller_1 = __importDefault(require("./warehouse/warehouse.controller"));
const app = new app_1.default([
    new googleauth_controller_1.default(),
    new adminAuthentication_controller_1.default(),
    new zone_controller_1.default(),
    new pincodetype_controller_1.default(),
    new authentication_controller_1.default(),
    new vendor_authentication_controller_1.default(),
    new warehouse_controller_1.default(),
    new admin_controller_1.default(),
    new product_controller_1.default(),
    new freightrate_controller_1.default(),
    new category_controller_1.default(),
    new subcateogry_controller_1.default(),
    new vendor_warehouse_controller_1.default(),
    new admin_vendor_warehouse_controller_1.default(),
    new admin_product_controller_1.default(),
    new cart_controller_1.default(),
    new blog_controller_1.default(),
]);
app.listen();
