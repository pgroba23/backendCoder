import Contenedor from './contenedor';
import admin from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.cert(config.firebase),
  //   databaseURL: 'https://contenedor-e0f0f.firebaseio.com',
});
console.log('Base Firebase conectada!');
const db = admin.firestore();
const asObj = (doc) => ({ id: doc.id, ...doc.data() });

export default class ContenedorFirebase extends Contenedor {
  constructor(nombre) {
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
    return asObj(snapshot.data());
  }

  async guardar(data) {
    await this.collection.add(data);
  }

  async actualizar(data) {
    await this.collection.doc(data.id).update(data);
  }

  async eliminar(id) {
    await this.collection.doc(id).delete();
  }

  async eliminarAll() {
    await this.collection.delete();
  }
}
