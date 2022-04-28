import express from 'express';
import { check } from 'express-validator';

import { validate } from '../../middlewares';
import { sendEmail } from '../../helpers';


const router = express.Router();

router.post('/', [
    check('text', 'El campo text es requirido').notEmpty(),
    check('name', 'El campo name es requirido').notEmpty(),
    check('email', 'El campo email es requirido').notEmpty(),
    check('phone', 'El campo phone es requirido').notEmpty(),
    check('category', 'El campo category es requirido').notEmpty(),
    check('type', 'El campo type es requirido').notEmpty(),
    validate,
], sendEmail);

export default router;