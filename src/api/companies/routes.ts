import express, { Request, Response } from "express";
import { check } from "express-validator";

import { validate, validateJWT, generateUrl } from "../../middlewares";

const router = express.Router();

import { list, listOne, add, update, remove } from "./controller";

router.get("/", validateJWT, list);

router.get(
    "/:id",
    [validateJWT, check("id", "Invalid id").notEmpty(), validate],
    listOne
);

router.post(
    "/",
    [
        validateJWT,
        check("name", "Invalid name").notEmpty(),
        check("address", "Invalid address").notEmpty(),
        check("phone", "Invalid phone").notEmpty(),
        check("url", "Invalid url").notEmpty(),
        check("image", "Invalid image").notEmpty(),
        validate,
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

module.exports = router;
