import UsuarioDto from '../dtos/UsuarioDto.js';
import Usuario from '../../negocio/Usuario.js';
import { usuarioDao } from '../daos/index.js';

export default class UsuariosRepo {
	constructor() {
		this.dao = usuarioDao;
		this.dao.inicializar();
	}

	async listarAll() {
		const dtos = await this.dao.listarAll();
		return dtos.map((dto) => new Usuario(dto).datos());
	}

	async listar(idUsuario) {
		const dto = await this.dao.listar(idUsuario);
		return dto ? new Usuario(dto).datos() : [];
	}

	async guardar(usuario) {
		const dto = new UsuarioDto(usuario.datos());
		await this.dao.guardar(dto.datos());
	}

	async actualizar(usuario) {
		const dto = new UsuarioDto(usuario.datos());
		await this.dao.actualizar(dto.datos());
	}

	async eliminar(idUsuario) {
		const dto = await this.dao.eliminar(idUsuario);
	}
}
