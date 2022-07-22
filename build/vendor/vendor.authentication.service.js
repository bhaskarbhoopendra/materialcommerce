"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vendor_dbmanager_1 = __importDefault(require("./vendor.dbmanager"));
const bcrypt = __importStar(require("bcryptjs"));
const userWithThatEmailAlreadyExistsException_1 = __importDefault(require("../exceptions/userWithThatEmailAlreadyExistsException"));
const jwt = __importStar(require("jsonwebtoken"));
const wrongCredentialsException_1 = __importDefault(require("../exceptions/wrongCredentialsException"));
const vendor_model_1 = __importDefault(require("./vendor.model"));
class VendorService {
    constructor() {
        this.vendorDbManager = new vendor_dbmanager_1.default();
        this.vendor = vendor_model_1.default;
        this.register = async (data) => {
            const { email } = data;
            const vendor = await this.vendor.findOne({ email: email });
            if (vendor)
                throw new userWithThatEmailAlreadyExistsException_1.default(email);
            const password = data.password;
            const hashedPassword = await bcrypt.hash(password, 10);
            const createdVendor = await this.vendorDbManager.createVendor(Object.assign(Object.assign({}, data), { password: hashedPassword }));
            const tokenData = this.createToken(createdVendor);
            const cookie = this.createCookie(tokenData);
            return {
                createdVendor,
                cookie,
            };
        };
        this.login = async (userCred) => {
            try {
                const email = userCred.email;
                const password = userCred.password;
                const vendor = await this.vendorDbManager.findVendorByEmail(email);
                if (!vendor)
                    throw new wrongCredentialsException_1.default();
                const isValidPassword = await bcrypt.compare(password, vendor.get("password", null, { getters: false }));
                if (!isValidPassword)
                    throw new wrongCredentialsException_1.default();
                const tokenData = this.createToken(vendor);
                const cookie = this.createCookie(tokenData);
                return {
                    tokenData,
                    cookie,
                    vendor,
                };
            }
            catch (error) {
                console.log(error);
            }
        };
        this.createToken = (createdVendor) => {
            const expiresIn = 60 * 60;
            const { JWT_SECRET } = process.env;
            const dataStoredInToken = { _id: createdVendor._id };
            return {
                expiresIn,
                token: jwt.sign(dataStoredInToken, `${JWT_SECRET}`, { expiresIn }),
            };
        };
        this.createCookie = (tokenData) => {
            return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn} `;
        };
    }
}
exports.default = VendorService;
