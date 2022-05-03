import { NextFunction, Response } from "express";

import jwt from 'jsonwebtoken';
import { config } from '../../config';


import { User } from '../api/models';
const secret = config.jwt?.secret || '';

export const validateJWT = async (req: any, res: Response, next: NextFunction) => {
    const token = req.header('token');
    if (!token) {
        return res.status(401).json({
            message: 'The request does not have a token'
        });
    }

    try {
        const { sub } = jwt.verify(token, secret);
        const user = await User.findById(sub);
        if (!user) {
            return res.status(401).json({ msg: 'Invalid token!' });
        }
        if (!user.status) {
            return res.status(401).json({ msg: 'Invalid token - talk to the administrator' });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid token'
        });
    }

};