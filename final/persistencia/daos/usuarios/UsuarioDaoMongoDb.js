import ContenedorMongo from '../../contenedor/ContenedorMongo.js';

class UsuarioDaoMongoDb extends ContenedorMongo {
	constructor() {
		super('usuarios', {
			id: { type: String, required: true },
			email: { type: String, required: true },
			password: { type: String, required: true },
			name: { type: String, required: true },
			lastname: { type: String, required: true },
			phone: { type: String, required: true },
			image: { type: String, required: true },
		});
	}
}

export default UsuarioDaoMongoDb;
