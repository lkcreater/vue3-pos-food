import express, { Request, Response, NextFunction } from 'express';
import InterfaceApplication from './interfaces/application.interface';
import { InterfaceController } from './interfaces/controller.interface';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ModelDatabase } from './database/model.database';

export type OptionApp = {
    port?: Number,
}

export class App implements InterfaceApplication{

    public $app: express.Application;   
    public $router: express.Router;

    private controllers: InterfaceController[] = [];
    private port: Number = 3000; 

    constructor(controllers: InterfaceController[]){
        this.$app = express();
        this.$router = express.Router();
        this.controllers = controllers;              
    }

    public run(option: OptionApp){
        this.initailizeCors();
        this.initailizeBodyParser();
        this.initailizeControllers();
        this.actionIndex();          
        this.syncDatabase();
        const numberPort = (option?.port) ? option.port : this.port;
        this.listen(Number(numberPort));
    }

    public listen(port?: number) {
        this.$app.listen(port, () => {            
            console.log(`App listening on the port ${port}`);
        });
    }

    private initailizeCors(){
        this.$app.use(cors());
    }

    private initailizeBodyParser(){
        //-- parse requests of content-type - application/json
        this.$app.use(bodyParser.json());
        //-- parse requests of content-type - application/x-www-form-urlencoded
        this.$app.use(bodyParser.urlencoded({ extended: true }));
    }

    private initailizeControllers(){
        this.controllers.forEach( controller => {
            //console.table(controller);
            this.$app.use('/api', controller.router);
        })
    }

    private syncDatabase(){
        ModelDatabase.connection();
    }

    private actionIndex(){
        this.$router.get('/', function(req: Request, res: Response, next: NextFunction){
            res.send('hello index');
        })
        this.$app.use(this.$router);
    }
    
}
