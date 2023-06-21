import fs from 'fs';
import path, { resolve } from 'path';
import multer from "multer";
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import Mime from 'mime-types';
import { Request, Response } from 'express';

export class MulterError extends multer.MulterError {}

export enum MulterErrorMesseges {
    MulterError = 'A Multer error occurred when uploading.',
    UnknownError = 'An unknown error occurred when uploading.',
    FoundDirectory = 'Not Found Directory!',
    InvalidFileName = 'Invalid file name, please check.'
}

export interface interfaceOptionUpload {
    req: Request,
    res: Response,
    typeFilter?: string[],
    maxCount?: number | undefined,
}

export interface FileInfo {
    originalname: string,
    filename: string,
    encoding: string,
    mimetype: string,
    url: string,
    size: number
}

export interface RequestFile extends Request {
    fileInfo?: FileInfo | undefined;
    fileRead?: {
        filename: string,
        path: string
    }
}

class MulterPlugin {
    public multer: multer.Multer = multer();
    public readonly routeReadFile: string = 'upload';
    public rootFolderName: string = 'uploads';
    public subFolderName: string = dayjs().format('YYYY-MM');

    constructor() {        
        this.multer = multer(this.configStorage());
    }

    public upload = (fieldName: string, options: interfaceOptionUpload) => {
        return new Promise((resolve, rejects) => {
            const {req, res} = options;
            const upload = this.multer.single(fieldName);

            upload(req, res, async (err: any) => {
                if (err instanceof MulterError) {   
                    return rejects(MulterErrorMesseges.MulterError);
                } else if (err) {
                    return rejects(err || MulterErrorMesseges.UnknownError);        
                }   
                return resolve(<FileInfo>{
                    originalname: req.file?.originalname,
                    filename: req.file?.filename,
                    encoding: req.file?.encoding,
                    mimetype: req.file?.mimetype,
                    size: req.file?.size,
                    url: this.getUrl(req.file?.filename as string)
                });         
            })
        });
    }

    public uploads = (fieldName: string, options: interfaceOptionUpload) => {
        return this.multer.array(fieldName, options?.maxCount);
    }

    public getUrl = (fileName: string): string => { 
        return `/api/${this.routeReadFile}/${fileName}`;
    }

    public createUploadDirectories = () => {
        const __dirname = path.resolve();
        const __pathUploadName = path.resolve(__dirname, `/${this.rootFolderName}/${this.subFolderName}`);
        return this.createDirectories(__pathUploadName);
    }

    public createDirectories = (pathname: string, isCreate: boolean = true): string | undefined => {
            const dirname = path.normalize(path.resolve(__dirname, '../../'));
            pathname = pathname.replace(/^\.*\/|\/?[^\/]+\.[a-z]+|\/$/g, '');
            const pathDirectories = path.resolve(dirname, pathname);
            
            if (!fs.existsSync(pathDirectories)){
                if(isCreate === false){
                    throw MulterErrorMesseges.FoundDirectory;
                }

                fs.mkdir(pathDirectories, { recursive: true }, error => {
                    if(error) throw error;           
                });                   
            }   
            return pathDirectories;
    }

    public findDirectoryRoot = (fileName: string): string | undefined => {
        const directory = this.findDirectoryByFilename(fileName);
        const __dirname = path.resolve();
        const __pathUploadName = path.resolve(__dirname, `/${this.rootFolderName}/${directory}`);        
        return this.createDirectories(__pathUploadName, false);
    }

    private configStorage = () => {        
        const directory = this.createUploadDirectories();
        return {
            fileFilter: (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
                cb(null, true);
            },
            storage: multer.diskStorage({
                destination: (req, file, cb) => {                    
                    cb(null, directory as string);
                },
                filename: (req, file, cb) => {
                    cb(null, uuidv4() + '_' + this.subFolderName + '.' + Mime.extension(file.mimetype))
                }
            })
        };
    }

    private findDirectoryByFilename = (fileName: string) : string => {
        try {
            const extactName: string[] = fileName?.split("_");
            const path: string[] = extactName[1]?.split(".");
            return path[0];
        } catch (error) {
            throw MulterErrorMesseges.InvalidFileName
        }
        
    }
}

export default MulterPlugin;