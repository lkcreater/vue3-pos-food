import express, { Request, Response, NextFunction } from "express";
import Controller, { InterfaceController, InterfaceModuleApplication } from "../../interfaces/controller.interface";
import MenuController from "./controllers/menu.controller";
import CategoryController from "./controllers/category.controller";

class RestaurantsModule extends Controller implements InterfaceModuleApplication {

    public path = '/restaurants';
    public router = express.Router();

    constructor(controllers: InterfaceController[]) {
        super();
        this.initailController(controllers);
    }

    public initializeRoutes(){
        
    }

    public initailController(controllers: InterfaceController[]): void {
        controllers.forEach( controller => {
            this.router.use(this.path, controller.router);
        })
    }

    public run(): InterfaceController {
        return {
            path: this.path,
            router: this.router,
            initializeRoutes: this.initializeRoutes
        }
    }
}

export default new RestaurantsModule([
    new MenuController(),
    new CategoryController()
]);