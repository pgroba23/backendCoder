import ChatDto from '../dtos/ChatDto.js';
import Chat from '../../negocio/Chat.js';
import { chatsDao } from '../daos/index.js';

export default class ChatsRepo {
	constructor() {
		this.dao = chatsDao;
		this.dao.inicializar();
	}

	async listarAll() {
		const dtos = await this.dao.listarAll({});
		return dtos.map((dto) => new Chat(dto).datos());
	}

	async listar(idChat) {
		const dto = await this.dao.listar(idChat);
		return new Chat(dto);
	}

	async guardar(chat) {
		const dto = new ChatDto(chat.datos());
		await this.dao.guardar(dto.datos());
	}

	async eliminar(idChat) {
		const dto = await this.dao.eliminar(idChat);
		return new Chat(dto);
	}
}
