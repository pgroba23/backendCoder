//import { v4 as uuidv4 } from 'uuid';

export default class Carrito {
	#id;
	#prods;

	constructor({ id, prods }) {
		this.#id = id;
		this.#prods = prods;
	}

	/**getters */
	get id() {
		return this.#id;
	}

	get prods() {
		return this.#prods;
	}

	/**setters */
	set id(id) {
		this.#id = id;
	}

	set prods(prods) {
		this.#prods = prods;
	}

	datos() {
		return Object.freeze(
			JSON.parse(
				JSON.stringify({
					id: this.#id,
					prods: this.#prods,
				})
			)
		);
	}
}
