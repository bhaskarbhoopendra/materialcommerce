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
const userWithThatEmailAlreadyExistsException_1 = __importDefault(require("../exceptions/userWithThatEmailAlreadyExistsException"));
const user_model_1 = __importDefault(require("../user/user.model"));
const bcrypt = __importStar(require("bcryptjs"));
const user_dbmanager_1 = __importDefault(require("../user/user.dbmanager"));
const jwt = __importStar(require("jsonwebtoken"));
const wrongCredentialsException_1 = __importDefault(require("../exceptions/wrongCredentialsException"));
class AuthenticationService {
    constructor() {
        this.user = user_model_1.default;
        this.userDbManager = new user_dbmanager_1.default();
        this.register = async (data) => {
            const { email, password } = data;
            const foundUser = await this.user.findOne({ email: email });
            if (foundUser)
                throw new userWithThatEmailAlreadyExistsException_1.default(email);
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = Object.assign(Object.assign({}, data), { password: hashedPassword });
            const user = await this.user.create(Object.assign({}, newUser));
            const tokenData = this.createToken(user);
            return {
                user,
                tokenData,
            };
        };
        this.login = async (userData) => {
            const { email, password } = userData;
            const user = await this.user.findOne({ email });
            if (!user)
                throw new wrongCredentialsException_1.default();
            const comparePasswords = await bcrypt.compare(password, user.get("password", null, { getters: false }));
            const tokenData = this.createToken(user);
            return { user, tokenData };
        };
        this.createToken = (user) => {
            const expiresIn = 60 * 60;
            const { JWT_SECRET } = process.env;
            const dataStoredInToken = {
                _id: user._id,
            };
            return {
                expiresIn,
                token: jwt.sign(dataStoredInToken, `${JWT_SECRET}`, { expiresIn }),
            };
        };
        this.createCookie = (tokenData) => {
            return `Authorization=${tokenData.token} ; HttpOnly; Max-Age=${tokenData.expiresIn} `;
        };
    }
}
exports.default = AuthenticationService;
