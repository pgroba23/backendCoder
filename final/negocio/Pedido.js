//import { v4 as uuidv4 } from 'uuid';

export default class Pedido {
	#id;
	#fecha;
	#idCliente;
	#prods;

	constructor({ id, fecha, idCliente, prods }) {
		this.#id = id;
		this.#fecha = fecha;
		this.#idCliente = idCliente;
		this.#prods = prods;
	}

	/**getters */
	get id() {
		return this.#id;
	}

	get prods() {
		return this.#prods;
	}

	get fecha() {
		return this.#fecha;
	}
	get idCliente() {
		return this.#idCliente;
	}

	/**setters */
	set id(id) {
		this.#id = id;
	}

	set prods(prods) {
		this.#prods = prods;
	}

	set fecha(fecha) {
		this.#fecha = fecha;
	}

	set idCliente(idCliente) {
		this.#idCliente = idCliente;
	}

	datos() {
		return Object.freeze(
			JSON.parse(
				JSON.stringify({
					id: this.#id,
					fecha: this.#fecha,
					idCliente: this.#idCliente,
					prods: this.#prods,
				})
			)
		);
	}
}
