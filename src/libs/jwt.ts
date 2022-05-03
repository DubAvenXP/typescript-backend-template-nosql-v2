import jwt from 'jsonwebtoken';
import { config } from '../../config';

export const generateJWT = (id = '', expiresIn = config.jwt.expiresIn) => {
    return new Promise((resolve, reject) => {
        const payload = { sub: id };
        jwt.sign(payload, config.jwt.secret, { expiresIn }, (err, token) => {
            if (err) {
                console.error(err);
                reject('The token could not be generated');
            } else {
                resolve(token);
            }
        });
    });
};
