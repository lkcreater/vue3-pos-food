import { Express } from "express";

interface InterfaceApplication {
    $app: Express.Application;    
}

export default InterfaceApplication;