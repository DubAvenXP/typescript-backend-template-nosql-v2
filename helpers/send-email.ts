
import moment from 'moment-timezone';

import { err, success } from './response';
import { transporter } from '../libs/nodemailer';
import { Response } from 'express';

const now = moment().tz('America/Guatemala').format('YYYY-MM-DD HH:mm:ss');
const receivers = ['alejandro@moonkeydevs.com'];

export async function sendEmail(req: any, res: Response) {
  const { text, name, email, phone, category, type, } = req.body;

  try {
    await transporter.sendMail({
      from: `"Website .MOV 💬" <webmaster.agenciaotb@gmail.com>`,
      to: receivers,
      bcc: ['other@gmail.com'],
      subject: `Un cliente se quiere comunicar contigo ${now}`,
      html: `
      <div style="
          width: 100%;
          margin: 0 auto;
          font-family: 'Roboto', sans-serif;
          font-size: 1.2rem;
          text-align: center;
          padding: 25px 0;
          background-color: #fafafa;
          ">
          <h2
          style="
          padding: 10px;
          background-color: #000000;
          color: #f5f5f5;
          text-decoration: none;
          border-radius: 5px;
          font-size: 2rem;"
          >Un cliente se quiere comunicar contigo</h2>
          <img src="https://res.cloudinary.com/agencia-otb/image/upload/v1648659483/samples/productora%20mov/Recurso_88_4x-8_ji0pj2.png" alt="logo" style="width: 200px;">
          <ul style="
            list-style: none;
            padding: 0;
            margin: 0 auto;
            max-width: 720px;
      ">
        <li style="margin: 1rem 0
        <li style="margin: 1rem 0">
            <span style="font-weight: bold;">Correo: </span><span style="color: #000">${email}</span>
        </li>
        <li style="margin: 1rem 0">
            <span style="font-weight: bold;">Télefono: </span><span style="color: #000">${phone}</span>
        </li>
        <li style="margin: 1rem 0">
            <span style="font-weight: bold;">Categoria: </span><span style="color: #000">${category}</span>
        </li>
        <li style="margin: 1rem 0">
        <span style="font-weight: bold;">Tipo de Produccion: </span><span style="color: #000">${type}</span>
        </li>
        <li style="margin: 1rem 0">
        <span style="font-weight: bold;">Mensaje: </span><span style="color: #000">${text}</span>
        </li>
        <li style="margin: 1rem 0">
        <span style="font-weight: bold;">Fecha: </span><span style="color: #000">${now}</span>
        </li>
      </ul>
      </div>
      `

    });
    success(req, res, 'Mensaje enviado con exito!', 200);
  } catch (error) {
    console.error(error);
    err(req, res, error, 500);
  }
}
