import express, { Request, Response, NextFunction } from "express";
import Controller, { InterfaceController } from "../../../interfaces/controller.interface";
import { validates, body } from "../../../plugins/validate.plugin";
import { Menu } from '../models/menu.model'
import { PageMessegeError, MessegeError, MessegeRespone } from "../../../utils";

interface CusRequest extends Request {
    getQueryModel?: Menu | null
}

class MenuController extends Controller implements InterfaceController {
    public path = '/menu';
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
        this.router.put(`${this.path}/:id`, this.modelById, this.actionUpdate);
    }

    private validateField = () => {
        return validates([
            body('title').not().isEmpty().trim().escape(),
            body('desc').escape()
        ])
    }

    private modelById = async (req: CusRequest, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const model = await Menu.findByPk(id);
            if(!model){
                res.status(404).send(MessegeError(<PageMessegeError>'C404'));
                return;
            }
            req.getQueryModel = model;
            return next()
        } catch (error) {
            res.status(500).send(MessegeError(<PageMessegeError>'C500', error));
        }
    }

    public actionIndex = async (req: Request, res: Response) => {
        const data = await Menu.findAll();
        res.send({
            page: data
        });
    }

    public actionCreate = async (req: Request, res: Response) => {
        try {
            const respone = await Menu.create(req.body);
            res.send(MessegeRespone(respone));
        } catch (error) {
            res.status(500).send(MessegeError(<PageMessegeError>'C500', error));
        }
    }

    public actionUpdate = async (req: CusRequest, res: Response) => {
        res.send(req.getQueryModel);
    }
}

export default MenuController;