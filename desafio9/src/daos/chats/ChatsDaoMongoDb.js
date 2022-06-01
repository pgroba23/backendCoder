import ContenedorMongo from '../../contenedor/ContenedorMongo.js';
import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
  email: { type: String, required: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  edad: { type: Number, required: true },
  alias: { type: String, required: true },
  avatar: { type: String, required: true },
});

class ChatsDaoMongoDb extends ContenedorMongo {
  constructor() {
    super('chats', {
      id: { type: Number, required: true },
      mensaje: { type: String, required: true },
      author: { type: authorSchema, required: true },
    });
  }
}

export default ChatsDaoMongoDb;
