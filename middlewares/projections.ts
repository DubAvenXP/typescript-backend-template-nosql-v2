import { Response, NextFunction } from 'express';

export const projections = (customProjections = {}) => {
    return async (req: any, res: Response, next: NextFunction) => {
        req.projections = customProjections;
        next();
    };
};

