import ProductoDto from '../dtos/ProductoDto.js';
import Producto from '../../negocio/Producto.js';
import { productosDao } from '../daos/index.js';

export default class ProductosRepo {
	constructor() {
		this.dao = productosDao;
		this.dao.inicializar();
	}

	async listarAll() {
		const dtos = await this.dao.listarAll();
		return dtos.map((dto) => new Producto(dto).datos());
	}

	async listar(idProd) {
		const dto = await this.dao.listar(idProd);
		return dto ? new Producto(dto).datos() : [];
	}

	async guardar(prod) {
		const dto = new ProductoDto(prod.datos());
		await this.dao.guardar(dto.datos());
		//return new Producto(dtoGuardado);
	}

	async actualizar(prod) {
		const dto = new ProductoDto(prod.datos());
		await this.dao.actualizar(dto.datos());
	}

	async eliminar(idProd) {
		const dto = await this.dao.eliminar(idProd);
	}
}
