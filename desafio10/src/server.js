import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { array as productosTest } from './test/productosTest.js';
import { engine } from 'express-handlebars';
import { Server as HttpServer } from 'http';
import { Server as Socket } from 'socket.io';
import { Contenedor } from './contenedor.js';
import { chatsDao } from './daos/index.js';
import { knexConfig as knexConfigMysql } from './mysql/knexconfig.js';
// import { knexConfig as knexConfigSqlite } from './sqlite/knexconfig.js';
import {
  chatEntity,
  print,
  normalize,
  denormalize,
} from './entity/chatEntity.js';

const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const handlebarsConfig = {
  defaultLayout: 'index.handlebars',
  layoutsDir: './src/views/layouts',
};

const productos = [];
const chats = [];
const contenedorProductos = new Contenedor('productos', knexConfigMysql);
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

const sessionVar = session({
  store: MongoStore.create({
    //En Atlas connect App :  Make sure to change the node version to 2.2.12:
    // mongoUrl: `mongodb+srv://coderhouse:coderhouse@cluster0.o0eqf.mongodb.net/sesiones?authSource=admin&replicaSet=atlas-39qwv9-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`,
    mongoUrl: `mongodb+srv://pablodb:pablodb@cluster0.rv6li.mongodb.net/sesiones?retryWrites=true&w=majority`,
    mongoOptions: advancedOptions,
  }),
  /* ----------------------------------------------------- */

  secret: 'pablo',
  resave: false,
  saveUninitialized: false /* ,
cookie: {
    maxAge: 40000
} */,
});

app.use(sessionVar);

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

//app.use(express.static('public'));

app.get('/productos-test', (req, res) => {
  res.render('productListTest', { productosTest });
});

const soloParaAdmins = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.status(403).json({
      error: -1,
      descripcion: `ruta ${req.url} método ${req.method} no autorizada`,
    });
  }
};

app.get('/', soloParaAdmins, (req, res) => {
  const path = 'index.html';
  res.sendFile(path, { root: 'public' });
});

app.get('/login', (req, res) => {
  if (req.query.user && req.query.pass) {
    req.session.user = req.query.user;
    req.session.pass = req.query.pass;
    res.send(`Login Ok`);
  } else {
    res.send(`Debe pasar usuario y pass por parametro`);
  }
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
