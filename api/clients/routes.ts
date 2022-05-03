import express, { Request, Response } from "express";
import { check } from "express-validator";

import {
    validate,
    validateJWT,
    generateUrl,
    projections,
} from "../../middlewares";

const router = express.Router();

import { list, listOne, add, update, remove } from "./controller";

router.get("/", [projections({ __v: 0, createdAt: 0, updatedAt: 0 })], list);

router.get("/:id", [check("id", "Invalid id").notEmpty(), validate], listOne);

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

module.exports = router;
