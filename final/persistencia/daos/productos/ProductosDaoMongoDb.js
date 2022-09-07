import ContenedorMongo from '../../contenedor/ContenedorMongo.js';

class ProductoDaoMongoDb extends ContenedorMongo {
	constructor() {
		super('productos', {
			id: { type: String, required: true },
			name: { type: String, required: true },
			description: { type: String, required: true },
			image: { type: String, required: true },
			price: { type: Number, required: true },
		});
	}
}

export default ProductoDaoMongoDb;
