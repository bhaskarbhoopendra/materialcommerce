"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
class UserDTO {
}
__decorate([
    (0, class_validator_1.IsString)()
], UserDTO.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)()
], UserDTO.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsString)()
], UserDTO.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsString)()
], UserDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)()
], UserDTO.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNumber)()
], UserDTO.prototype, "phoneNumber", void 0);
__decorate([
    (0, class_validator_1.IsString)()
], UserDTO.prototype, "source", void 0);
__decorate([
    (0, class_validator_1.IsString)()
], UserDTO.prototype, "lastVisited", void 0);
__decorate([
    (0, class_validator_1.IsArray)()
], UserDTO.prototype, "wishlist", void 0);
__decorate([
    (0, class_validator_1.IsArray)()
], UserDTO.prototype, "cart", void 0);
exports.default = UserDTO;
