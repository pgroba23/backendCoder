import ContenedorMongo from '../../contenedor/ContenedorMongo.js';
import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  foto_url: String,
  precio: Number,
  stock: Number,
});

class CarritoDaoMongoDb extends ContenedorMongo {
  constructor() {
    super('carritos', {
      id: { type: Number, required: true },
      productos: { type: [productoSchema], required: true },
    });
  }
}

export default CarritoDaoMongoDb;
