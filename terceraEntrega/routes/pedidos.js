import { Router } from 'express';
import { carritosDao } from '../daos/index.js';
import { transporter } from '../nodemailer/config.js';
import { clienteSms } from '../messageSenders/smsSender/index.js';
import { clienteWsp } from '../messageSenders/wspSender/index.js';
import { smsAdmin, twilioWhatsappPhoneNumber } from '../config.js';
import dotenv from '../dotenv/dotenv.js';
import logger from '../log4js/logger.js';

const pedidos = Router();

pedidos.get('/venta', async (req, res) => {
  const user = req.user;
  const carrito = await carritosDao.listar(`${user.id}`);
  const body = carrito.productos.map((p) => '<p>' + p.nombre + '</p><br />');
  const mailOptions = {
    from: 'ECommerce',
    to: process.env.USER_MAIL,
    subject: `Nuevo pedido de ${user.nombre} - ${user.username}`,
    html: `<h1 style="color: blue;">Lista de productos: </h1><br />${body}`,
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    logger.error(error);
  }
  await clienteWsp.enviar({
    numero: `whatsapp:+549${smsAdmin}`,
    texto: `Nuevo pedido de ${user.nombre} - ${user.username}`,
  });

  await clienteSms.enviar({
    numero: `+54${user.telefono}`,
    texto: 'Su pedido ha sido recibido y se encuentra en proceso',
  });

  //vaciar carrito
  const carritoVacio = {
    id: user.id,
    productos: [],
  };
  await carritosDao.actualizar(carritoVacio);

  res.status(200).json({
    error: 0,
    descripcion: 'Venta exitosa',
  });
});

export { pedidos };
