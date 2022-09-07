import ContenedorMongo from '../../contenedor/ContenedorMongo.js';
import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  foto_url: { type: String, required: true },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true },
});

class CarritoDaoMongoDb extends ContenedorMongo {
  constructor() {
    super('carritos', {
      id: { type: Number, required: true },
      productos: {
        type: [productoSchema],
        default: undefined,
        required: [true, 'Must have it'],
      },
    });
  }
}

export default CarritoDaoMongoDb;
