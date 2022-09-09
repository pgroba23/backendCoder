export default class CarritoDto {
	constructor({ id, prods }) {
		this.id = id;
		this.prods = prods;
	}

	datos() {
		return Object.freeze(
			JSON.parse(
				JSON.stringify({
					id: this.id,
					prods: this.prods,
				})
			)
		);
	}
}
