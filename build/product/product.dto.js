"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
class BaseProductAvailability {
}
__decorate([
    (0, class_validator_1.IsBoolean)()
], BaseProductAvailability.prototype, "isAreaCalculate", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)()
], BaseProductAvailability.prototype, "isCancelable", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)()
], BaseProductAvailability.prototype, "isRefundable", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)()
], BaseProductAvailability.prototype, "isReturnable", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)()
], BaseProductAvailability.prototype, "cashOnDeliverry", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)()
], BaseProductAvailability.prototype, "isOfferAvailable", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)()
], BaseProductAvailability.prototype, "isDeliveryChargeApplicable", void 0);
class ProductDTO extends BaseProductAvailability {
}
__decorate([
    (0, class_validator_1.IsString)()
], ProductDTO.prototype, "productName", void 0);
__decorate([
    (0, class_validator_1.IsNumber)()
], ProductDTO.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsString)()
], ProductDTO.prototype, "taxType", void 0);
__decorate([
    (0, class_validator_1.IsNumber)()
], ProductDTO.prototype, "tax", void 0);
__decorate([
    (0, class_validator_1.IsNumber)()
], ProductDTO.prototype, "discountedPrice", void 0);
__decorate([
    (0, class_validator_1.IsString)()
], ProductDTO.prototype, "saleIn", void 0);
__decorate([
    (0, class_validator_1.IsNumber)()
], ProductDTO.prototype, "weight", void 0);
__decorate([
    (0, class_validator_1.IsString)()
], ProductDTO.prototype, "wightUnit", void 0);
__decorate([
    (0, class_validator_1.IsNumber)()
], ProductDTO.prototype, "height", void 0);
__decorate([
    (0, class_validator_1.IsString)()
], ProductDTO.prototype, "heightUnit", void 0);
__decorate([
    (0, class_validator_1.IsNumber)()
], ProductDTO.prototype, "length", void 0);
__decorate([
    (0, class_validator_1.IsString)()
], ProductDTO.prototype, "lengthUnit", void 0);
__decorate([
    (0, class_validator_1.IsNumber)()
], ProductDTO.prototype, "width", void 0);
__decorate([
    (0, class_validator_1.IsString)()
], ProductDTO.prototype, "widthUnit", void 0);
__decorate([
    (0, class_validator_1.IsNumber)()
], ProductDTO.prototype, "sku", void 0);
__decorate([
    (0, class_validator_1.IsNumber)()
], ProductDTO.prototype, "stock", void 0);
__decorate([
    (0, class_validator_1.IsNumber)()
], ProductDTO.prototype, "unitPerBox", void 0);
__decorate([
    (0, class_validator_1.IsNumber)()
], ProductDTO.prototype, "minimumQuantity", void 0);
__decorate([
    (0, class_validator_1.IsNumber)()
], ProductDTO.prototype, "maximumQuantity", void 0);
__decorate([
    (0, class_validator_1.IsString)()
], ProductDTO.prototype, "manufacturer", void 0);
__decorate([
    (0, class_validator_1.IsString)()
], ProductDTO.prototype, "madeIn", void 0);
__decorate([
    (0, class_validator_1.IsString)()
], ProductDTO.prototype, "image", void 0);
__decorate([
    (0, class_validator_1.IsString)()
], ProductDTO.prototype, "description", void 0);
exports.default = ProductDTO;
