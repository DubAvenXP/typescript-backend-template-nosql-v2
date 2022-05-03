import nodemailer, { TransportOptions } from 'nodemailer';
import { config } from '../../config';

const {
    host,
    port,
    user,
    password,
} = config.email;

export const transporter = nodemailer.createTransport({
    host,
    port,
    secure: true,
    auth: {
        user,
        pass: password,
    }
} as TransportOptions);

transporter.verify().then(() => {
    console.log('Ready for send emails');
});
