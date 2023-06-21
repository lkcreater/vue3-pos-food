import { FormatResponeInterface } from "./pageMessegeRespone";

export enum PageMessegeError {
    C100 = 'Continue',
    C101 = 'Switching Protocols',
    C103 = 'Early Hints',
    C200 = 'OK',
    C201 = 'Created',
    C202 = 'Accepted',
    C203 = 'Non-Authoritative Information',
    C204 = 'No Content',
    C205 = 'Reset Content',
    C206 = 'Partial Content',
    C300 = 'Multiple Choices',
    C301 = 'Moved Permanently',
    C302 = 'Found',
    C303 =' See Other',
    C304 = 'Not Modified',
    C307 = 'Temporary Redirect',
    C308 = 'Permanent Redirect',
    C400 = 'Bad Request',
    C401 = 'Unauthorized',
    C402 = 'Payment Required',
    C403 = 'Forbidden',
    C404 = 'Not Found',
    C405 = 'Method Not Allowed',
    C406 = 'Not Acceptable',
    C407 = 'Proxy Authentication Required',
    C408 = 'Request Timeout',
    C409 = 'Conflict',
    C410 = 'Gone',
    C411 = 'Length Required',
    C412 = 'Precondition Failed',
    C413 = 'Payload Too Large',
    C414 = 'URI Too Long',
    C415 = 'Unsupported Media Type',
    C416 = 'Range Not Satisfiable',
    C417 = 'Expectation Failed',
    C418 = `I'm a teapot`,
    C422 = 'Unprocessable Entity',
    C425 = 'Too Early',
    C426 = 'Upgrade Required',
    C428 = 'Precondition Required',
    C429 = 'Too Many Requests',
    C431 = 'Request Header Fields Too Large',
    C451 = 'Unavailable For Legal Reasons',
    C500 = 'Internal Server Error',
    C501 = 'Not Implemented',
    C502 = 'Bad Gateway',
    C503 = 'Service Unavailable',
    C504 = 'Gateway Timeout',
    C505 = 'HTTP Version Not Supported',
    C506 = 'Variant Also Negotiates',
    C507 = 'Insufficient Storage',
    C508 = 'Loop Detected',
    C510 = 'Not Extended',
    C511 = 'Network Authentication Required',
}

export interface MessegeErrorInterface extends FormatResponeInterface {
    data: PageMessegeError,
}

export const MessegeError = (code: PageMessegeError, error?: any): MessegeErrorInterface => {
    const errors = <MessegeErrorInterface>{
        status: 'error',
        data: PageMessegeError[code],
    }
    
    if(error){
        errors.messege = error;
    }

    return errors;
}