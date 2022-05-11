import express from 'express';
import { Server as HttpServer } from 'http';
import { Server as Socket } from 'socket.io';
import { Contenedor } from './contenedor.js';
import { knexConfig as knexConfigMysql } from './mysql/knexconfig.js';
import { knexConfig as knexConfigSqlite } from './sqlite/knexconfig.js';

const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

const productos = [];
const chats = [];
const contenedorProductos = new Contenedor('productos', knexConfigMysql);
const contenedorChats = new Contenedor('mensajes', knexConfigSqlite);

const main = async () => {
  productos.push(...(await contenedorProductos.getAll()));
  chats.push(...(await contenedorChats.getAll()));
};
main();

// configuro el socket

io.on('connection', (socket) => {
  socket.emit('productos', productos);
  socket.emit('chats', chats);

  socket.on('update', (producto) => {
    productos.push({ ...producto, id: productos.length + 1 });
    contenedorProductos.save(producto);
    io.sockets.emit('productos', productos);
  });

  socket.on('chatupd', (chat) => {
    chats.push({ ...chat, fecha: new Date().toLocaleString() });
    contenedorChats.save({ ...chat, fecha: new Date().toLocaleString() });
    io.sockets.emit('chats', chats);
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const PORT = 8080;
const connectedServer = httpServer.listen(PORT, () => {
  console.log(
    `Servidor http escuchando en el puerto ${connectedServer.address().port}`
  );
});
connectedServer.on('error', (error) =>
  console.log(`Error en servidor ${error}`)
);
