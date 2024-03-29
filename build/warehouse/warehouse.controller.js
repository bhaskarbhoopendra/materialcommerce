"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_middleware_1 = __importDefault(require("../middleware/admin.middleware"));
const warehouse_model_1 = __importDefault(require("./warehouse.model"));
const warehouse_dbmanager_1 = __importDefault(require("./warehouse.dbmanager"));
class WarehouseController {
    constructor() {
        this.path = "/warehouse";
        this.router = (0, express_1.Router)();
        this.warehouseDbManager = new warehouse_dbmanager_1.default();
        this.warehouseModel = warehouse_model_1.default;
        this.createWarehouse = async (request, response) => {
            try {
                const warehouseData = request.body;
                const createWarehouse = new this.warehouseModel(Object.assign({}, warehouseData));
                const warehouse = await createWarehouse.save();
                response.send({ warehouse });
            }
            catch (error) {
                return error;
            }
        };
        this.updateWarehouse = async (request, response) => {
            try {
                const warehouseId = request.params.warehouseId;
                if (warehouseId == undefined)
                    response.send("Id not found");
                const updateData = request.body;
                const updatedWarehouse = await this.warehouseDbManager.warehouseByIDAndUpdate(warehouseId, updateData);
                response.send(updatedWarehouse);
            }
            catch (error) {
                return error;
            }
        };
        this.getAllWarehouse = async (request, response) => {
            try {
                const warehouse = await this.warehouseDbManager.getAllWarehouse();
                if (!warehouse)
                    response.send("No Warehouse Found");
                response.send(warehouse);
            }
            catch (error) {
                return error;
            }
        };
        this.deleteWarehouse = async (request, response) => {
            try {
                const warehouseId = request.params.warehouseId;
                if (!warehouseId)
                    response.send("Id not found");
                await this.warehouseDbManager.warehouseByIDAndDelete(warehouseId);
                response.send("Deleted");
            }
            catch (error) {
                return error;
            }
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/create`, admin_middleware_1.default, this.createWarehouse);
        this.router.put(`${this.path}/update/:warehouseId`, admin_middleware_1.default, this.updateWarehouse);
        this.router.get(`${this.path}`, admin_middleware_1.default, this.getAllWarehouse);
        this.router.delete(`${this.path}/delete/:warehouseId`, admin_middleware_1.default, this.deleteWarehouse);
    }
}
exports.default = WarehouseController;
