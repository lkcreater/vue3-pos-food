import express, { Request, Response, NextFunction } from "express";
import Controller, { InterfaceController } from "../../../interfaces/controller.interface";
import { validates, body } from "../../../plugins/validate.plugin";
import { RestaurantCategory } from '../models/restaurant.category.model';
import { PageMessegeError, MessegeError, MessegeRespone } from "../../../utils";

interface CusRequest extends Request {
    getQueryModel?: RestaurantCategory | null
}

class CategoryController extends Controller implements InterfaceController {
    public path = '/category';
    public router = express.Router();

    constructor(){
        super();

        this.initializeRoutes();
    }

    public initializeRoutes(): void {
        this.router.get(`${this.path}`, this.actionIndex);
        //-- CREATE
        this.router.post(`${this.path}`, this.validateField(), this.actionCreate);
        //-- UPDATE
        //this.router.put(`${this.path}/:id`, this.modelById, this.actionUpdate);
    }

    private validateField = () => {
        return validates([
            body('title').not().isEmpty().trim().escape(),
            body('desc').escape()
        ])
    }

    public actionIndex = async (req: CusRequest, res: Response) =>{
        try {
            const respone = await RestaurantCategory.findAll();
            res.send(MessegeRespone(respone));
        } catch (error) {
            res.status(500).send(this.error500(error));
        }
    }

    public actionCreate = async (req: Request, res: Response) => {
        try {
            const respone = await RestaurantCategory.create(req.body);
            res.send(MessegeRespone(respone));
        } catch (error) {
            res.status(500).send(this.error500(error));
        }
    }

    private error500 = (error: unknown) => {
        return MessegeError(<PageMessegeError>'C500', error);
    }
}

export default CategoryController;