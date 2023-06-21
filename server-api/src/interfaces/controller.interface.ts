import { Router } from 'express';

export interface InterfaceController {
    path: string;
    router: Router;
    initializeRoutes(): void;    
}

export interface InterfaceModuleApplication extends InterfaceController {
    initailController(controllers: InterfaceController[]): void;
    run(): InterfaceController 
}

export default class Controller {
    constructor() {
        
    }
}