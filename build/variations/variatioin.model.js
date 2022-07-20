"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const variationSchema = new mongoose_1.default.Schema({
    varitationName: String,
    property: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "property",
        },
    ],
    product: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "product",
        },
    ],
});
const VariationModel = mongoose_1.default.model("variation", variationSchema);
exports.default = VariationModel;
