import express from 'express';
import { array as productosTest } from './test/productosTest.js';
import { engine } from 'express-handlebars';
import { Server as HttpServer } from 'http';
import { Server as Socket } from 'socket.io';
import { Contenedor } from './contenedor.js';
import { chatsDao } from './daos/index.js';
import { knexConfig as knexConfigMysql } from './mysql/knexconfig.js';
import { passport, sessionVar } from './passport/passport.js';
import { workerFunction } from './cluster/worker.js';
import { clusterFunction } from './cluster/cluster.js';
import { info } from './routes/info.js';
import { randoms } from './routes/randoms.js';
import logger from './log4js/logger.js';

import {
  chatEntity,
  print,
  normalize,
  denormalize,
} from './entity/chatEntity.js';

const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

const handlebarsConfig = {
  defaultLayout: 'index.handlebars',
  layoutsDir: './src/views/layouts',
};

const productos = [];
const chats = [];
const contenedorProductos = new Contenedor('productos', knexConfigMysql);
const scripts = [{ script: ['js/main.js'] }];

const main = async () => {
  await chatsDao.inicializar();
  productos.push(...(await contenedorProductos.getAll()));
  chats.push(...(await chatsDao.listarAll()));
};
main();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(sessionVar);
app.use(passport.initialize());
app.use(passport.session());

// configuro el socket

io.on('connection', (socket) => {
  socket.emit('productos', productos);
  socket.emit('chats', normalize(chats, [chatEntity]));

  socket.on('update', (producto) => {
    productos.push({ ...producto, id: productos.length + 1 });
    contenedorProductos.save(producto);
    io.sockets.emit('productos', productos);
  });

  socket.on('chatupd', async (chat) => {
    const chatDenormalized = denormalize(
      chat.result,
      chatEntity,
      chat.entities
    );

    await chatsDao.guardar({
      ...chatDenormalized,
      fecha: new Date().toLocaleString(),
    });

    chats.push({ ...chatDenormalized, fecha: new Date().toLocaleString() });
    io.sockets.emit('chats', normalize(chats, [chatEntity]));
  });
});

app.engine('handlebars', engine(handlebarsConfig));
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.get('/productos-test', (req, res) => {
  logger.info(`Ruta: ${req.path} - Metodo: ${req.method}`);
  res.render('productListTest', { productosTest });
});

app.use('/info', info);
app.use('/api/randoms', randoms);

const soloParaAdmins = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.render('login');
  }
};

app.get('/', soloParaAdmins, (req, res) => {
  logger.info(`Ruta: ${req.path} - Metodo: ${req.method}`);
  console.log(`PID WORKER ${process.pid}`);
  res.render('main', { scripts, usuario: req.user.username });
});

app.use(express.static('public'));

app.post(
  '/registro',
  passport.authenticate('registro', {
    failureRedirect: '/failRegister',
    successRedirect: '/successRegister',
  })
);
app.get('/failRegister', (req, res) => {
  logger.info(`Ruta: ${req.path} - Metodo: ${req.method}`);
  res.render('register-error');
});
app.get('/successRegister', (req, res) => {
  logger.info(`Ruta: ${req.path} - Metodo: ${req.method}`);
  res.redirect('/');
});

// login
app.post(
  '/login',
  passport.authenticate('login', {
    failureRedirect: '/failLogin',
    successRedirect: '/successLogin',
  })
);
app.get('/failLogin', (req, res) => {
  logger.info(`Ruta: ${req.path} - Metodo: ${req.method}`);
  res.render('login-error');
});
app.get('/successLogin', (req, res) => {
  logger.info(`Ruta: ${req.path} - Metodo: ${req.method}`);
  res.redirect('/');
});

app.get('/logout', (req, res) => {
  logger.info(`Ruta: ${req.path} - Metodo: ${req.method}`);
  if (req.isAuthenticated()) {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ err: err });
      }
    });
  }
  res.redirect('/');
});

app.all('*', (req, res) => {
  const { url, method } = req;
  logger.warn(
    `Ruta: ${req.path} - Metodo: ${req.method} - ${url} no implementada`
  );
  res.send(`Ruta ${method} ${url} no está implementada`);
});

// if (process.argv[3] == 'cluster') {
//   clusterFunction(httpServer);
// } else {
//   workerFunction(httpServer);
// }

const PORT = parseInt(process.argv[2]) || 8080;

const connectedServer = httpServer.listen(PORT, () => {
  logger.info(
    `Servidor http escuchando en el puerto ${
      connectedServer.address().port
    } - PID WORKER ${process.pid}`
  );
  console.log(
    `Servidor http escuchando en el puerto ${
      connectedServer.address().port
    } - PID WORKER ${process.pid}`
  );
});
connectedServer.on('error', (error) =>
  logger.error(`Error en servidor ${error}`)
);
