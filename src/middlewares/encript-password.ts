import bycriptjs from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';


export const encriptPassword = async (req: Request, res: Response, next: NextFunction) => {
    const { password } = req.body;
    const salt = await bycriptjs.genSalt(10);
    req.body.password = bycriptjs.hashSync(password, salt);
    next();
};
