import express from 'express';
import { array as productosTest } from './test/productosTest.js';
import { engine } from 'express-handlebars';
import { Server as HttpServer } from 'http';
import { Server as Socket } from 'socket.io';
import { Contenedor } from './contenedor.js';
import { chatsDao } from './daos/index.js';
import { knexConfig as knexConfigMysql } from './mysql/knexconfig.js';
import { passport, sessionVar } from './passport/passport.js';

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
// const contenedorChats = new Contenedor('mensajes', knexConfigSqlite);

// const wrap = (middleware) => (socket, next) =>
//   middleware(socket.request, {}, next);

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
  res.render('productListTest', { productosTest });
});

const soloParaAdmins = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.render('login');
  }
};

app.get('/', soloParaAdmins, (req, res) => {
  res.render('main', { scripts, usuario: req.user });
});

app.use(express.static('public'));

// app.post('/login', (req, res) => {
//   if (req.body.user && req.body.pass) {
//     req.session.user = req.body.user;
//     req.session.pass = req.body.pass;
//     res.redirect('/');
//   } else {
//     res.send(`Debe pasar usuario y pass por parametro`);
//   }
// });

app.post(
  '/registro',
  passport.authenticate('registro', {
    failureRedirect: '/failRegister',
    successRedirect: '/successRegister',
  })
);
app.get('/failRegister', (req, res) => {
  res.status(400).json({ err: 'fallo el registro' });
});
app.post('/successRegister', (req, res) => {
  res.json({ msg: 'ok' });
});

// login
app.post(
  '/login',
  passport.authenticate('login', {
    failureRedirect: '/failLogin',
    successRedirect: '/successLogin',
  })
);
app.post('/failLogin', (req, res) => {
  res.status(400).json({ err: 'fallo el login' });
});
app.post('/successLogin', (req, res) => {
  res.json({ msg: 'ok' });
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (!err) res.send('Logout ok!');
    else res.send({ status: 'Logout ERROR', body: err });
  });
});

const PORT = 8080;
const connectedServer = httpServer.listen(PORT, () => {
  console.log(
    `Servidor http escuchando en el puerto ${connectedServer.address().port}`
  );
});
connectedServer.on('error', (error) =>
  console.log(`Error en servidor ${error}`)
);
