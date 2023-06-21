import express, { Request, Response, NextFunction } from "express";
import Controller, { InterfaceController } from "../interfaces/controller.interface";
import MulterPlugin, { MulterError, MulterErrorMesseges, RequestFile, FileInfo }  from "../plugins/multer.plugin";
import { MessegeError, PageMessegeError, MessegeRespone } from "../utils";

class MediaController extends Controller implements InterfaceController {
    public path: string = '/media';
    public router: express.Router = express.Router();
    public multer: MulterPlugin = new MulterPlugin();

    constructor() {
        super();

        this.initializeRoutes();
    }

    public initializeRoutes(): void {
        //-- stream read file
        this.router.get(`/${this.multer.routeReadFile}/:file`, this.middleReadFile, this.actionReadFile);
        //-- upload file single
        this.router.post(`${this.path}`, this.middleUploadSingleFile, this.actionUpload);
    }

    private actionReadFile = (req: RequestFile, res: Response) => {
        res.sendFile(req.fileRead?.filename as string, { root: req.fileRead?.path }, (error) => {
            if (error) {
                res.status(404).send(MessegeError(<PageMessegeError>'C404', error));
            } 
        });
    }

    private actionUpload = (req: RequestFile, res: Response) => {    
        res.send(MessegeRespone(req.fileInfo));
    }

    private middleUploadSingleFile = async (req: RequestFile, res: Response, next: NextFunction) => {
        try {
            const file = await this.multer.upload('file', { req, res });  
            req.fileInfo = file as FileInfo;
            next();
        } catch (error) {
            res.status(500).send(MessegeError(<PageMessegeError>'C500', error));
        }        
    }

    private middleReadFile = (req: RequestFile, res: Response, next: NextFunction) => {
        try {
            const { file } = req.params;
            const directory = this.multer.findDirectoryRoot(file) as string;
            req.fileRead = {
                filename: file,
                path: directory
            }
            next();
        } catch (error) {
            res.status(400).send(MessegeError(<PageMessegeError>'C400', error));
        }        
    }
}

export default MediaController;