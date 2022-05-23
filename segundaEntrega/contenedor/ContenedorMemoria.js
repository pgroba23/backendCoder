import { Contenedor } from './contenedorArchivo';

export default class ContenedorMemoria extends Contenedor {
  constructor() {
    this.data = [];
  }
  async listarAll() {
    return this.data;
  }

  async listar(id) {
    return this.data.find((item) => item.id === id);
  }

  async guardar(data) {
    this.data.push(data);
  }

  async actualizar(data) {
    const index = this.data.findIndex((item) => item.id === data.id);
    this.data[index] = data;
  }

  async eliminar(id) {
    const index = this.data.findIndex((item) => item.id === id);
    this.data.splice(index, 1);
  }

  async eliminarAll() {
    this.data = [];
  }
}
