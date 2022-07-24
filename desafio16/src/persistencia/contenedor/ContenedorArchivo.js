import fs from 'fs';
import Contenedor from './Contenedor.js';

export default class ContenedorArchivo extends Contenedor {
  constructor(nombre, ruta = './') {
    super(nombre);
    //this.ruta = ruta + this.nombre + '.txt';
    this.ruta = `${ruta}/${this.nombre}.txt`;
    this.data = [];
  }
  async #leer() {
    this.data = JSON.parse(await fs.promises.readFile(this.ruta, 'utf-8'));
  }

  async #escribir() {
    await fs.promises.writeFile(this.ruta, JSON.stringify(this.data, null, 2));
  }

  async inicializar() {
    try {
      await fs.promises.access(this.ruta);
    } catch (error) {
      await this.#escribir();
    }
  }

  async listarAll() {
    await this.#leer();
    return [...this.data];
  }

  async listar(id) {
    await this.#leer();
    return this.data.find((item) => item.id === parseInt(id));
  }

  async guardar(data) {
    await this.#leer();
    this.data.push(data);
    await this.#escribir();
  }

  async actualizar(data) {
    await this.#leer();
    const index = this.data.findIndex((item) => item.id === data.id);
    this.data[index] = data;
    await this.#escribir();
  }

  async eliminar(id) {
    await this.#leer();
    const index = this.data.findIndex((item) => item.id === id);
    this.data.splice(index, 1);
    await this.#escribir();
  }

  async eliminarAll() {
    await this.#leer();
    this.data = [];
    await this.#escribir();
  }
}
