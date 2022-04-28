import express, { Request, Response } from "express";
import { check } from "express-validator";
import { err, success } from "../../helpers";

import {
    validate,
    validateJWT,
    generateUrl,
    projections,
} from "../../middlewares";
import { Client } from "../models";

const router = express.Router();

import { Client as Model } from "./schema";

import network from "../network"
const { list, add, update, remove } = network(Model);

router.get("/", [projections({ __v: 0, createdAt: 0, updatedAt: 0 })], list);

router.get(
    "/:url",
    [check("url", "Invalid client url").notEmpty(), validate],
    listOne
);

router.post(
    "/",
    [
        validateJWT,
        check("name", "Invalid name").notEmpty(),
        check("description", "Invalid description").notEmpty(),
        check("image", "Invalid image").notEmpty(),
        check("logo", "Invalid logo").notEmpty(),
        validate,
        generateUrl,
    ],
    add
);

router.put(
    "/:id",
    [validateJWT, check("id", "Invalid id").notEmpty().isMongoId(), validate],
    update
);

router.delete(
    "/:id",
    [validateJWT, check("id", "Invalid id").notEmpty().isMongoId(), validate],
    remove
);

async function listOne(req: Request, res: Response) {
    try {
        const { url } = req.params;
        const client = await Client.findOne(
            { url },
            { __v: 0, createdAt: 0, updatedAt: 0, status: 0 }
        );
        success(req, res, client, 200);
    } catch (error) {
        console.error(error);
        err(
            req,
            res,
            error,
            500,
        );
    }
}

export default router;
