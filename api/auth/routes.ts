import express, { Response } from "express";
import { check } from "express-validator";
import bcryptjs from "bcryptjs";

import { User as Model } from "../models";

import service from "../../database/methods";
const { get } = service(Model);

import { err, success } from "../../helpers";
import { validate, validateJWT } from "../../middlewares";
import { generateJWT } from "../../libs/jwt";

const router = express.Router();

router.post(
    "/login",
    [
        check("email", "Invalid email").notEmpty().isEmail(),
        check("password", "Invalid password").notEmpty().isLength({ min: 8 }),
        validate,
    ],
    async (req: any, res: Response) => {
        const { email, password } = req.body;
        req.query = { email };
        req.projections = { status: 1 };
        const {
            data: [user],
        } = await get(req);

        if (!user) {
            err(req, res, "Usuario invalido", 404);
            return;
        }

        if (!user.status) {
            err(
                req,
                res,
                "Su cuenta se encuentra suspendida, hable con el administrador",
                403
            );
            return;
        }

        const isValidPassword = bcryptjs.compareSync(password, user.password);
        if (!isValidPassword) {
            err(req, res, "contraseña invalida", 400);
            return;
        }

        user.status = undefined;

        const token = await generateJWT(user._id);

        success(req, res, { user, token }, 200);
    }
);

router.get("/verify", validateJWT, async (req: any, res: Response) => {
    const renewToken = await generateJWT(req.user._id);
    success(req, res, { token: renewToken }, 200);
});

export default router;
