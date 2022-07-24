import { Server as Socket } from "socket.io";
import { chatsDao, productosDao } from "../persistencia/daos/index.js";
import {
  chatEntity,
  print,
  normalize,
  denormalize,
} from "../persistencia/entity/chatEntity.js";

const productos = [];
const chats = [];
const scripts = [{ script: ["js/main.js"] }];

const main = async () => {
  await chatsDao.inicializar();
  await productosDao.inicializar();
  productos.push(...(await productosDao.listarAll()));
  chats.push(...(await chatsDao.listarAll()));
};
main();

export const serverSocket = (httpServer) => {
  const io = new Socket(httpServer);
  io.on("connection", (socket) => {
    socket.emit("productos", productos);
    socket.emit("chats", normalize(chats, [chatEntity]));

    socket.on("update", (producto) => {
      productos.push({ ...producto, id: productos.length + 1 });
      productosDao.guardar({
        ...producto,
        id: new Date().getTime().toString(),
      });
      io.sockets.emit("productos", productos);
    });

    socket.on("chatupd", async (chat) => {
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
      io.sockets.emit("chats", normalize(chats, [chatEntity]));
    });
  });
};
