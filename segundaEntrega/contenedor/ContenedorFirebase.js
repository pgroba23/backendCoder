import Contenedor from './contenedor.js';
import admin from 'firebase-admin';
import config from '../config.js';

admin.initializeApp({
  credential: admin.credential.cert(config.firebase),
  //   databaseURL: 'https://contenedor-e0f0f.firebaseio.com',
});
console.log('Base Firebase conectada!');
const db = admin.firestore();
const asObj = (doc) => ({ id: doc.id, ...doc.data() });

export default class ContenedorFirebase extends Contenedor {
  constructor(nombre) {
    super();
    this.collection = db.collection(nombre);
  }

  async listarAll() {
    const snapshot = await this.collection.get();
    const result = [];
    snapshot.forEach((doc) => result.push(asObj(doc)));
    //return snapshot.docs.map((doc) => doc.data());
    return result;
  }

  async listar(id) {
    const snapshot = await this.collection.doc(id).get();
    return snapshot.data();
  }

  async guardar(data) {
    await this.collection.doc(String(data.id)).set(data);
  }

  async actualizar(data) {
    await this.collection.doc(String(data.id)).update(data);
  }

  async eliminar(id) {
    await this.collection.doc(String(id)).delete();
  }

  async eliminarAll() {
    await this.collection.delete();
  }
}
