import { Request, Response } from "express";

export const success = (
    req: Request | any,
    res: Response,
    payload: any,
    status: number
) => {
    const statusCode = status || 200;

    res.status(statusCode).send(payload);
};
export const err = (
    req: Request | any,
    res: Response,
    error: any,
    status: number,
) => {
    const statusCode = status || 500;
    const statusMessage = error || "Internal server error";

    console.error("[Response error] " + error);
    res.status(statusCode).send(error);
};
export const errors = (
    req: Request | any,
    res: Response,
    error: any,
    status: number,
    param: string,
    location = "body"
) => {
    const statusCode = status || 500;
    const msg = error || "Internal server error";
    console.error("[Response error] " + error);
    return res.status(statusCode).send({
        errors: [
            {
                msg,
                param,
                location,
            },
        ],
    });
};