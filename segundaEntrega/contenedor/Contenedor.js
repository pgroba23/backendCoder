export default class Contenedor {
  constructor(nombre) {
    this.nombre = nombre;
  }

  async listarAll() {
    throw new Error('Sin implementar');
  }
  async listar(id) {
    throw new Error('Sin implementar');
  }

  async guardar(data) {
    throw new Error('Sin implementar');
  }

  async actualizar(data) {
    throw new Error('Sin implementar');
  }

  async eliminar(id) {
    throw new Error('Sin implementar');
  }

  async eliminarAll() {
    throw new Error('Sin implementar');
  }

  async inicializar() {}
}
