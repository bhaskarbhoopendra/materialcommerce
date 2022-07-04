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
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt = __importStar(require("jsonwebtoken"));
const admin_model_1 = __importDefault(require("../admin.model"));
const admin_authenticate_service_1 = __importDefault(require("./admin.authenticate.service"));
const wrongCredentialsException_1 = __importDefault(require("../../exceptions/wrongCredentialsException"));
class AdminAuthenticationController {
    constructor() {
        this.path = "/admin";
        this.router = (0, express_1.Router)();
        this.admin = admin_model_1.default;
        this.adminAuthenticateService = new admin_authenticate_service_1.default();
        this.adminRegister = async (request, response, next) => {
            const adminData = request.body;
            try {
                const { cookie, admin } = await this.adminAuthenticateService.register(adminData);
                response.setHeader("Set-Cookie", [cookie]);
                response.send(admin);
            }
            catch (error) {
                next(error);
            }
        };
        this.adminLogin = async (request, response, next) => {
            try {
                const logInData = request.body;
                const admin = await this.admin.findOne({ email: logInData.email });
                if (admin) {
                    const isPasswordMatching = await bcryptjs_1.default.compare(logInData.password, admin.get("password", null, { getters: false }));
                    if (isPasswordMatching) {
                        const tokenData = this.createToken(admin);
                        const cookie = this.createCookie(tokenData);
                        // response.setHeader("Set-Cookie", [cookie]);
                        response.cookie("Authorization", `${tokenData.token}`, {
                            expires: new Date(Date.now() + 900000),
                            httpOnly: true,
                        });
                        response.send({ tokenData, admin });
                    }
                    else {
                        next(new wrongCredentialsException_1.default());
                    }
                }
                else {
                    next(new wrongCredentialsException_1.default());
                }
            }
            catch (error) {
                return error;
            }
        };
        this.adminLogout = (request, response) => {
            try {
                response.setHeader("Set-Cookie", ["Authorization=;Max-Age=0"]);
                response.send("Logged Out");
            }
            catch (error) {
                return error;
            }
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/register`, this.adminRegister);
        this.router.post(`${this.path}/login`, this.adminLogin);
        this.router.post(`${this.path}/logout`, this.adminLogout);
    }
    createCookie(tokenData) {
        const value = true;
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
    }
    createToken(admin) {
        const expiresIn = 60 * 60; // an hour
        const { JWT_SECRET } = process.env;
        const dataStoredInToken = {
            _id: admin._id,
        };
        return {
            expiresIn,
            token: jwt.sign(dataStoredInToken, `${JWT_SECRET}`, { expiresIn }),
        };
    }
}
// router.get('/vendor-requests', async (req, res) => {
//   try {
//     // Vendors who have been confirmed
//     const confirmedVendorData = await NewVendor.find({ confirmed: true }).select('name email address phoneNumber GST company')
//     // Vendors who have not been confirmed
//     const unconfirmedVendorData = await NewVendor.find({ confirmed: false }).select('name email address phoneNumber GST company')
//     const vendorRequestData = {
//       confirmed: confirmedVendorData,
//       unconfirmed: unconfirmedVendorData
//     }
//     res.status(200).json(vendorRequestData)
//   } catch (e) {
//     console.error(e.message)
//     res.status(500).send('Server error')
//   }
// })
exports.default = AdminAuthenticationController;
