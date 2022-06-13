"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const HttpException_1 = __importDefault(require("../exceptions/HttpException"));
function validationMiddleware(type, skipMissingProperties = false) {
    return (req, res, next) => {
        const dtoObj = (0, class_transformer_1.plainToInstance)(type, req.body);
        (0, class_validator_1.validate)(dtoObj, { skipMissingProperties }).then((errors) => {
            if (errors.length > 0) {
                const message = errors
                    .map((error) => Object.values(error.constraints))
                    .join(", ");
                next(new HttpException_1.default(400, message));
            }
            else {
                req.body(dtoObj);
                next();
            }
        });
    };
}
exports.default = validationMiddleware;
