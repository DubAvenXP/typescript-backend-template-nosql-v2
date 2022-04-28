import { NextFunction, Request, Response } from 'express';
import nanoid from 'nanoid';

export const generateUrl = async (req: Request, res: Response, next: NextFunction) => {
    const name = req.body.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const id = nanoid.nanoid(10);
    req.body.url = name.replace(/ /g, '-').concat('-', id).toLowerCase();
    next()
};