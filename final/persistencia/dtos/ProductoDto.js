export default class ProductoDto {
	constructor({ name, description, price, image, id }) {
		this.name = name;
		this.price = price;
		this.image = image;
		this.description = description;
		this.id = id;
	}

	datos() {
		return Object.freeze(
			JSON.parse(
				JSON.stringify({
					id: this.id,
					name: this.name,
					price: this.price,
					image: this.image,
					description: this.description,
				})
			)
		);
	}
}
