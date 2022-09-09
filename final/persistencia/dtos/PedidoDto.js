export default class PedidoDto {
	constructor({ id, fecha, idCliente, prods }) {
		this.id = id;
		this.fecha = fecha;
		this.idCliente = idCliente;
		this.prods = prods;
	}

	datos() {
		return Object.freeze(
			JSON.parse(
				JSON.stringify({
					id: this.id,
					fecha: this.fecha,
					idCliente: this.idCliente,
					prods: this.prods,
				})
			)
		);
	}
}
