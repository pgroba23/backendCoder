import ChatsRepo from '../persistencia/repositorio/ChatsRepo.js';
import {
	chatEntity,
	normalize,
	denormalize,
} from '../persistencia/entity/chatEntity.js';
import Chat from '../negocio/Chat.js';

const chats = [];
const chatsRepo = new ChatsRepo();

const main = async () => {
	chats.push(...(await chatsRepo.listarAll()));
};
main();

export const socket = (socket) => {
	socket.emit('chats', normalize(chats, [chatEntity]));
	socket.on('chatupd', async (chat) => {
		const chatDenormalized = denormalize(
			chat.result,
			chatEntity,
			chat.entities
		);
		const data = new Chat({
			...chatDenormalized,
			fecha: new Date().toLocaleString(),
		});
		await chatsRepo.guardar(data);
		chats.push(data.datos());
		io.sockets.emit('chats', normalize(chats, [chatEntity]));
	});
};
