import express, { Request, Response, NextFunction } from "express";
import Controller, { InterfaceController } from "../interfaces/controller.interface";
import { Category, GetModelFindAll, CreateModel } from "../models/category.model";
import { validates, body } from "../plugins/validate.plugin";
import { PageMessegeError, MessegeError, MessegeRespone } from "../utils";

class CategoryController extends Controller implements InterfaceController {

    public path = '/category';
    public router = express.Router();

    constructor(){
        super();

        this.initializeRoutes();
    }

    public initializeRoutes(){
        //-- index
        this.router.get(`${this.path}`, this.actionIndex);
        //-- create
        this.router.post(`${this.path}`, validates([
            body('title').not().isEmpty().trim().escape()
        ]), this.actionCreate);
    }

    private async actionIndex(req: Request, res: Response){
        try {
            const model = await GetModelFindAll();
            res.send(MessegeRespone(model));
        } catch (error) {
            res.status(500).send(MessegeError(<PageMessegeError>'C500', error));
        }        
    }

    private async actionCreate(req: Request, res: Response){
        try {
            const respone = await CreateModel(req.body);
            res.send(MessegeRespone(respone));
        } catch (error) {
            res.status(500).send(MessegeError(<PageMessegeError>'C500', error));
        }
    }
}

export default CategoryController;