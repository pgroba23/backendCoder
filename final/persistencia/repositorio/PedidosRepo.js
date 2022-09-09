import PedidoDto from '../dtos/PedidoDto.js';
import Pedido from '../../negocio/Pedido.js';
import { pedidosDao } from '../daos/index.js';

export default class PedidosRepo {
	constructor() {
		this.dao = pedidosDao;
		this.dao.inicializar();
	}

	async listarAll() {
		const dtos = await this.dao.listarAll();
		return dtos.map((dto) => new Pedido(dto).datos());
	}

	async listar(idPedido) {
		const dto = await this.dao.listar(idPedido);
		return dto ? new Pedido(dto).datos() : [];
	}

	async guardar(pedido) {
		const dto = new PedidoDto(pedido.datos());
		await this.dao.guardar(dto.datos());
	}

	async actualizar(pedido) {
		const dto = new PedidoDto(pedido.datos());
		await this.dao.actualizar(dto.datos());
	}

	async eliminar(idPedido) {
		const dto = await this.dao.eliminar(idPedido);
	}
}
