import { NextFunction, Response } from "express";

export const populateData = (dataToPopulate: any) => {
    return async (req: any, res: Response, next: NextFunction) => {
        req.dataToPopulate = dataToPopulate;
        next();
    };
};