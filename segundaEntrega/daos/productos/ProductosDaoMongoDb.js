import ContenedorMongo from '../../contenedor/ContenedorMongo';

class ProductoDaoMongoDb extends ContenedorMongo {
  constructor() {
    super('productos', {
      id: { type: Number, required: true },
      nombre: { type: String, required: true },
      descripcion: { type: String, required: true },
      foto_url: { type: String, required: true },
      precio: { type: Number, required: true },
      stock: { type: Number, required: true },
    });
  }
}

export default ProductoDaoMongoDb;
