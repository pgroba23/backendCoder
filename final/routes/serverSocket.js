import { Server as Socket } from 'socket.io';
import { socket } from '../controllers/socketController.js';

export const serverSocket = (httpServer) => {
	const io = new Socket(httpServer);
	io.on('connection', socket);
};
