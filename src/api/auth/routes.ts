import express, { Response } from "express";
import { check } from "express-validator";

import { validate, validateJWT } from "../../middlewares";
import { login, verify } from "./controller";

const router = express.Router();

router.post(
    "/login",
    [
        check("email", "Invalid email").notEmpty().isEmail(),
        check("password", "Invalid password").notEmpty().isLength({ min: 8 }),
        validate,
    ],
    login
);

router.get("/verify", validateJWT, verify);

module.exports = router;
