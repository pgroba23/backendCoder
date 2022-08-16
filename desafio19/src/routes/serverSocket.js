import { Server as Socket } from 'socket.io';
import ProductosRepo from '../persistencia/repositorio/ProductosRepo.js';
import ChatsRepo from '../persistencia/repositorio/ChatsRepo.js';
import {
	chatEntity,
	normalize,
	denormalize,
} from '../persistencia/entity/chatEntity.js';
import Producto from '../negocio/Producto.js';
import Chat from '../negocio/Chat.js';

const productos = [];
const chats = [];
const productosRepo = new ProductosRepo();
const chatsRepo = new ChatsRepo();

const main = async () => {
	productos.push(...(await productosRepo.listarAll()));
	chats.push(...(await chatsRepo.listarAll()));
};
main();

export const serverSocket = (httpServer) => {
	const io = new Socket(httpServer);
	io.on('connection', (socket) => {
		socket.emit('productos', productos);
		socket.emit('chats', normalize(chats, [chatEntity]));

		socket.on('update', (producto) => {
			const data = new Producto({
				...producto,
				id: new Date().getTime().toString(),
			});
			productos.push(data.datos());
			productosRepo.guardar(data);
			io.sockets.emit('productos', productos);
		});

		socket.on('chatupd', async (chat) => {
			const chatDenormalized = denormalize(
				chat.result,
				chatEntity,
				chat.entities
			);
			console.log('chatDenormalized', chatDenormalized);
			const data = new Chat({
				...chatDenormalized,
				fecha: new Date().toLocaleString(),
			});
			console.log('data', data.datos());
			await chatsRepo.guardar(data);

			chats.push(data.datos());
			io.sockets.emit('chats', normalize(chats, [chatEntity]));
		});
	});
};
