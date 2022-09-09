import CarritoDto from '../dtos/CarritoDto.js';
import Carrito from '../../negocio/Carrito.js';
import { carritosDao } from '../daos/index.js';

export default class CarritosRepo {
	constructor() {
		this.dao = carritosDao;
		this.dao.inicializar();
	}

	async listarAll() {
		const dtos = await this.dao.listarAll();
		return dtos.map((dto) => new Carrito(dto).datos());
	}

	async listar(idCarrito) {
		const dto = await this.dao.listar(idCarrito);
		return dto ? new Carrito(dto).datos() : [];
	}

	async guardar(carrito) {
		const dto = new CarritoDto(carrito.datos());
		await this.dao.guardar(dto.datos());
	}

	async actualizar(carrito) {
		const dto = new CarritoDto(carrito.datos());
		await this.dao.actualizar(dto.datos());
	}

	async eliminar(idCarrito) {
		const dto = await this.dao.eliminar(idCarrito);
	}
}
