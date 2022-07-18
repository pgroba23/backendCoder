import { createTransport } from 'nodemailer';
import dotenv from '../dotenv/dotenv.js';

const user = process.env.USER_MAIL;
const pass = process.env.PASS_MAIL;

const transporter = createTransport({
  host: 'smtp.ethereal.email',
  port: process.env.PORT_MAIL,
  auth: {
    user,
    pass,
  },
});

export { transporter };

// const mailOptions = {
//   from: 'Servidor Node.js',
//   to: TEST_MAIL,
//   subject: 'Mail de prueba desde Node.js',
//   html: '<h1 style="color: blue;">Contenido de prueba desde <span style="color: green;">Node.js con Nodemailer</span></h1>',
// };

// try {
//   const info = await transporter.sendMail(mailOptions);
//   console.log(info);
// } catch (error) {
//   console.log(error);
// }
