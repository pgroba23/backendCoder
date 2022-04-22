const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: Socket } = require('socket.io');

const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

const { Contenedor } = require('./contenedor');

const productos = [];
const chats = [];
const contenedorProductos = new Contenedor('src/productos.txt');
const contenedorChats = new Contenedor('src/chats.txt');

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
