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
const jwt = __importStar(require("jsonwebtoken"));
const authenticationTokenMissingException_1 = __importDefault(require("../exceptions/authenticationTokenMissingException"));
const VendorNotFoundException_1 = __importDefault(require("../exceptions/VendorNotFoundException"));
const wrongAuthenticationTokenException_1 = __importDefault(require("../exceptions/wrongAuthenticationTokenException"));
const enums_vendor_1 = __importDefault(require("../enums/enums.vendor"));
const vendor_model_1 = __importDefault(require("../vendor/vendor.model"));
async function confirmedVendorMiddleware(request, response, next) {
    const cookies = request.cookies;
    if (cookies && cookies.Authentication) {
        const { JWT_SECRET } = process.env;
        try {
            const verificationResponse = jwt.verify(`${JWT_SECRET}`, cookies.Authorization);
            const id = verificationResponse._id;
            const vendor = await vendor_model_1.default.findById(id);
            if (!vendor)
                throw new VendorNotFoundException_1.default(id);
            if (vendor.isConfirmedVendor !== enums_vendor_1.default.CONFIRMED)
                throw new wrongAuthenticationTokenException_1.default();
            request.user = vendor;
            next();
        }
        catch (error) {
            return error;
        }
    }
    else {
        next(new authenticationTokenMissingException_1.default());
    }
}
exports.default = confirmedVendorMiddleware;
