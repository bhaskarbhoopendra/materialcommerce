"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
<<<<<<< HEAD
const IsString_1 = require("class-validator/types/decorator/typechecker/IsString");
class LoginDto {
}
__decorate([
    (0, IsString_1.IsString)()
], LoginDto.prototype, "email", void 0);
__decorate([
    (0, IsString_1.IsString)()
], LoginDto.prototype, "password", void 0);
exports.default = LoginDto;
=======
const class_validator_1 = require("class-validator");
class LogInDto {
}
__decorate([
    (0, class_validator_1.IsString)()
], LogInDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)()
], LogInDto.prototype, "password", void 0);
exports.default = LogInDto;
>>>>>>> 41eb245f328fcf4111a6707f8d8317619b4578f4
