import express from "express";
import { check } from "express-validator";
import { emailExist } from "../../helpers";

import {
    validate,
    validateJWT,
    encriptPassword,
} from "../../middlewares";

const router = express.Router();

import { list, listOne, add, update, remove } from "./controller";

router.get("/", list);

router.get(
    "/:id",
    [check("id", "Invalid id").notEmpty().isMongoId(), validate],
    listOne
);

router.post(
    "/",
    [
        // validateJWT,
        check("name", "Invalid name").notEmpty(),
        check("email", "Invalid email").notEmpty().isEmail().custom(emailExist),
        check("password", "Invalid password").notEmpty().isLength({ min: 8 }),
        check("role", "Invalid role, must be admin_role or user_role")
            .notEmpty()
            .isIn(["admin_role", "user_role"]),
        check("company", "Invalid company, must be a valid mongo id")
            .optional()
            .isMongoId(),
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
