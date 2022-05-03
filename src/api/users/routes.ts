import express from "express";
import { check } from "express-validator";
import { emailExist } from "../../helpers";

import {
    validate,
    validateJWT,
    projections,
    encriptPassword,
} from "../../middlewares";

const router = express.Router();

import { list, listOne, add, update, remove } from "./controller";

router.get("/", [projections({ __v: 0, createdAt: 0, updatedAt: 0 })], list);

router.get("/:id", [check("id", "Invalid id").notEmpty(), validate], listOne);

router.post(
    "/",
    [
        // validateJWT,
        check("name", "Invalid name").notEmpty(),
        check("email", "Invalid email").notEmpty().isEmail().custom(emailExist),
        check("password", "Invalid password").notEmpty().isLength({ min: 8 }),
        check("role", "Invalid role")
            .notEmpty()
            .isIn(["admin_role", "user_role"]),
        validate,
        encriptPassword,
    ],
    add
);

router.put(
    "/:id",
    [
        validateJWT,
        check("id", "Invalid id").notEmpty().isMongoId(),
        check("name", "Invalid name").optional().isLength({ min: 3 }),
        check("email", "Invalid email").optional().isEmail().custom(emailExist),
        check("password", "Invalid password").optional().isLength({ min: 8 }),
        check("role", "Invalid role")
            .optional()
            .isIn(["admin_role", "user_role"]),
        validate,
    ],
    update
);

router.delete(
    "/:id",
    [validateJWT, check("id", "Invalid id").notEmpty().isMongoId(), validate],
    remove
);

module.exports = router;
