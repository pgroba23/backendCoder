import { Router } from 'express';
import { passport, sessionVar } from '../passport/passport.js';
import { productosDao, carritosDao } from '../daos/index.js';
import logger from '../log4js/logger.js';
import { transporter } from '../nodemailer/config.js';
import dotenv from '../dotenv/dotenv.js';

const login = Router();

login.use(sessionVar);
login.use(passport.initialize());
login.use(passport.session());

login.post(
  '/registro',
  passport.authenticate('registro', {
    failureRedirect: '/failRegister',
    successRedirect: '/successRegister',
  })
);
login.get('/failRegister', (req, res) => {
  logger.warn(
    `Ruta: ${req.path} - Metodo: ${req.method} - error al registrar usuario`
  );
  res.status(404).json({
    error: -3,
    descripcion: `error al registrar usuario`,
  });
});
login.get('/successRegister', async (req, res) => {
  //tendria que mandarlo a login
  //enviar mail al administrador con los datos del nuevo usuario
  const mailOptions = {
    from: 'ECommerce',
    to: process.env.USER_MAIL,
    subject: 'Nuevo registro',
    html: `<h1 style="color: blue;">Nuevo usuario</h1><br /><p>Nombre: ${req.user.nombre} </p>
     <p>Direccion: ${req.user.direccion}</p>
     <p>Telefono: ${req.user.telefono}</p>
     <p>Edad: ${req.user.edad}</p>
     <p>Username: ${req.user.username}</p>`,
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    logger.error(error);
  }
  req.login(req.user, (err) => {
    if (err) {
      logger.error(err);
      res.status(500).json({
        error: -1,
        descripcion: `error al loguear usuario`,
      });
    }
  });
  res.status(200).json({
    error: 0,
    descripcion: `Usuario registrado y logueado`,
  });
});

// login
login.post(
  '/login',
  passport.authenticate('login', {
    failureRedirect: '/failLogin',
    successRedirect: '/successLogin',
  })
);
login.get('/failLogin', (req, res) => {
  logger.warn(
    `Ruta: ${req.path} - Metodo: ${req.method} - error al loguear usuario`
  );
  res.status(400).json({
    error: -4,
    descripcion: `error al loguear usuario`,
  });
});
login.get('/successLogin', async (req, res) => {
  //se logueo con exito
  //agregar info del usuario y de su carrito asociado
  const usuario = req.user;
  const productos = await productosDao.listarAll();
  let carrito = await carritosDao.listar(`${usuario.id}`);
  if (!carrito) {
    carrito = { id: usuario.id, productos: [] };
    await carritosDao.guardar(carrito);
  }
  res.status(200).json({
    usuario: req.user,
    carrito,
    productos,
  });
});

login.get('/logout', (req, res) => {
  if (req.isAuthenticated()) {
    req.logout((err) => {
      if (err) {
        logger.error(`Ruta: ${req.path} - Metodo: ${req.method} - ${err}`);
        return res.status(500).json({ err: err });
      }
    });
  }
  res.status(200).json({
    error: 0,
    descripcion: `usuario deslogueado`,
  });
});

export { login };
