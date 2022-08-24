export default class ProductoDto {
	constructor({ title, price, thumbnail, id }) {
		this.title = title;
		this.price = price;
		this.thumbnail = thumbnail;
		this.id = id;
	}

	datos() {
		return Object.freeze(
			JSON.parse(
				JSON.stringify({
					id: this.id,
					title: this.title,
					price: this.price,
					thumbnail: this.thumbnail,
				})
			)
		);
	}
}
