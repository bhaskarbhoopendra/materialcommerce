"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const freightRateSchema = new mongoose_1.default.Schema({
    pincodetype: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "pincodetype",
    },
    zone: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "zone",
    },
    weightType: String,
    upperbound: Number,
    lowerbound: Number,
    rate: Number,
});
const FreightRateModel = mongoose_1.default.model("freightrate", freightRateSchema);
exports.default = FreightRateModel;
