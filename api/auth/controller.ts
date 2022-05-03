import bcryptjs from "bcryptjs";
import { Request, Response } from "express";

import dbMethods from "../../database/services";
import { err, success } from "../../helpers";
import { User } from "../models";
import { GetUserDto } from "../users/model";
import { generateJWT } from "../../libs/jwt";

const service = dbMethods(User);

export async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body;
        const query = { email, status: true };
        const projection = {};
        const populate: any[] = [];

        const [user] = await service.get<GetUserDto>({
            query,
            projection,
            populate,
        });

        if (!user) {
            err(req, res, { msg: "Invalid user or password" }, 404);
            return;
        }

        const isValidPassword = bcryptjs.compareSync(password, user.password);
        if (!isValidPassword) {
            err(req, res, { msg: "Invalid user or password" }, 400);
            return;
        }

        const token = await generateJWT(user._id);

        success(req, res, { user, token }, 200);
    } catch (error) {
        console.error(error);
        err(req, res, error, 500);
    }
}

export async function verify(req: any, res: Response) {
    try {
        const renewToken = await generateJWT(req.user._id);
        success(req, res, { token: renewToken }, 200);
    } catch (error) {
        console.error(error);
        err(req, res, error, 500);
    }
}
