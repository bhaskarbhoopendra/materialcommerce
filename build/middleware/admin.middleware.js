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
const admin_model_1 = __importDefault(require("../admin/admin.model"));
const authenticationTokenMissingException_1 = __importDefault(require("../exceptions/authenticationTokenMissingException"));
const wrongAuthenticationTokenException_1 = __importDefault(require("../exceptions/wrongAuthenticationTokenException"));
async function adminMiddleware(request, response, next) {
    const cookies = request.cookies;
    if (cookies && cookies.Authorization) {
        const { JWT_SECRET } = process.env;
        try {
            const verificationResponse = jwt.verify(cookies.Authorization, `${JWT_SECRET}`);
            const id = verificationResponse._id;
            const user = await admin_model_1.default.findById(id);
            if (user && user.isAdmin == true) {
                request.user = user;
                next();
            }
            else {
                next(new wrongAuthenticationTokenException_1.default());
            }
        }
        catch (error) {
            next(new wrongAuthenticationTokenException_1.default());
        }
    }
    else {
        next(new authenticationTokenMissingException_1.default());
    }
}
exports.default = adminMiddleware;
// export function isAdmin(
//   request: RequestWithUser | any,
//   response: Response,
//   next: NextFunction
// ) {
//   if (request.user.role == "ADMIN") {
//     next();
//   }
// }
