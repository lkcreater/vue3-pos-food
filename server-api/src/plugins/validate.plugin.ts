import { Request, Response, NextFunction } from 'express'; 
import { validationResult, ValidationChain } from 'express-validator';
import { PageMessegeError, MessegeError } from '../utils/pageMessegeError';
import { body } from 'express-validator';

export { 
    body
}

export const validates = (paramValidates: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        await Promise.all(paramValidates.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        res.status(400).send(MessegeError(<PageMessegeError>'C400', errors.array()));
    }
}