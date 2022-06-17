import Contenedor from './contenedor.js';
import mongoose from 'mongoose';
import config from '../../config.js';
import dotenv from '../dotenv/dotenv.js';

await mongoose.connect(process.env.CNXSTR, config.mongodb.options);

export default class ContenedorMongo extends Contenedor {
  constructor(nombre, esquema) {
    super(nombre);
    this.db = mongoose.model(nombre, new mongoose.Schema(esquema));
  }

  async listarAll() {
    return await this.db.find({}, { _id: 0, __v: 0 }).lean();
  }

  async listar(id) {
    return await this.db.findOne({ id }, { _id: 0, __v: 0 }).lean();
  }

  async guardar(data) {
    await this.db.create(data);
  }

  async actualizar(data) {
    await this.db.updateOne({ id: data.id }, data);
  }

  async eliminar(id) {
    await this.db.deleteOne({ id });
  }

  async eliminarAll() {
    await this.db.deleteMany({});
  }
}
