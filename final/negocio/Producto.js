//import { v4 as uuidv4 } from 'uuid';

export default class Producto {
	#id;
	#name;
	#description;
	#price;
	#image;

	constructor({ id, name, description, price, image }) {
		this.#id = id;
		this.#name = name;
		this.#description = description;
		this.#price = price;
		this.#image = image;
	}

	/**getters */
	get id() {
		return this.#id;
	}

	get name() {
		return this.#name;
	}

	get description() {
		return this.#description;
	}

	get price() {
		return this.#price;
	}

	get image() {
		return this.#image;
	}

	/**setters */
	set id(id) {
		this.#id = id;
	}

	set name(name) {
		this.#name = name;
	}

	set description(description) {
		this.#description = description;
	}

	set price(price) {
		this.#price = price;
	}

	set image(image) {
		this.#image = image;
	}

	datos() {
		return Object.freeze(
			JSON.parse(
				JSON.stringify({
					id: this.#id,
					name: this.#name,
					description: this.#description,
					price: this.#price,
					image: this.#image,
				})
			)
		);
	}
}
