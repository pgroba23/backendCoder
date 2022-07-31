export default class Producto {
	#id;
	#title;
	#price;
	#thumbnail;
	constructor({ title, price, thumbnail, id }) {
		this.#title = title;
		this.#price = price;
		this.#thumbnail = thumbnail;
		this.#id = id;
	}
	get title() {
		return this.#title;
	}
	get price() {
		return this.#price;
	}
	get thumbnail() {
		return this.#thumbnail;
	}
	get id() {
		return this.#id;
	}

	datos() {
		return Object.freeze(
			JSON.parse(
				JSON.stringify({
					id: this.#id,
					title: this.#title,
					price: this.#price,
					thumbnail: this.#thumbnail,
				})
			)
		);
	}
}
