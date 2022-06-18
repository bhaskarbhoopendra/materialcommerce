import { Request, Response, Router } from "express";
import Controller from "../interfaces/controller.interface";
import adminMiddleware from "../middleware/admin.middleware";
import WarehouseDTo from "./warehouse.dto";
import warehouseModel from "./warehouse.model";
import WarehouseDbManager from "./warehouse.dbmanager";

class WarehouseController implements Controller {
    public path = "/warehouse"
    public router = Router()
    public warehouseDbManager = new WarehouseDbManager()
    public warehouseModel = warehouseModel

    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.post(`${this.path}/create`,adminMiddleware,this.createWarehouse)
        this.router.put(`${this.path}/update/:warehouseId`,adminMiddleware,this.updateWarehouse)
        this.router.get(`${this.path}`,adminMiddleware,this.getAllWarehouse)
        this.router.delete(`${this.path}/delete/:warehouseId`,adminMiddleware,this.deleteWarehouse)
    }

    private createWarehouse = async (request: Request, response: Response) => {
     try {
         const warehouseData: WarehouseDTo = request.body
         const createWarehouse = new this.warehouseModel({
             ...warehouseData
         })
         const warehouse = await createWarehouse.save()
         response.send({warehouse})
     } catch (error) {
         return error
     }        
    }

    private updateWarehouse = async (request: Request, response: Response) => {
        try {
            const warehouseId: string = request.params.warehouseId;
            if (warehouseId == undefined) response.send("Id not found")
            const updateData: WarehouseDTo = request.body
            const updatedWarehouse = await this.warehouseDbManager.warehouseByIDAndUpdate(warehouseId,updateData)
            response.send(updatedWarehouse)
        } catch (error) {
            return error
        }
    }

    private getAllWarehouse = async (request: Request, response: Response) => {
        try {
            const warehouse = await this.warehouseDbManager.getAllWarehouse()
            if (!warehouse) response.send("No Warehouse Found")
            response.send(warehouse)
        } catch (error) {
            return error
        }
    }

    private deleteWarehouse = async (request: Request, response: Response) => {
        try {
            const warehouseId: string = request.params.warehouseId
            if (!warehouseId) response.send("Id not found")
            await this.warehouseDbManager.warehouseByIDAndDelete(warehouseId)
            response.send("Deleted")
        } catch (error) {
            return error
        }
    }
}

export default WarehouseController