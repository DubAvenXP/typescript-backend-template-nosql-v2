import { NextFunction, Response } from "express";


export const setUserId = async (req: any, res: Response, next: NextFunction) => {
    const { _id } = req.user;
    if (!_id) {
        return res.status(401).json({
            message: 'User not authenticated.'
        });
    }
    req.body.user = _id;
    next()
}