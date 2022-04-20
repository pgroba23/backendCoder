const fs = require('fs');

class Contenedor {
  constructor(nombreArchivo) {
    this.nombreArchivo = nombreArchivo;
  }

  static id = 1;

  async save(data) {
    try {
      const json = await fs.promises.readFile(this.nombreArchivo, 'utf8');
      const id = Contenedor.id++;
      const result = [...JSON.parse(json), { ...data, id }];
      await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(result));
    } catch (err) {
      const id = Contenedor.id++;
      const result = [{ ...data, id }];
      await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(result));
    }
  }

  async getById(id) {
    try {
      const data = await fs.promises.readFile(this.nombreArchivo, 'utf8');
      const json = JSON.parse(data);
      const result = json.find((item) => item.id === id);
      return result ? result : null;
    } catch (error) {
      throw error;
    }
  }
  async getAll() {
    try {
      const data = await fs.promises.readFile(this.nombreArchivo, 'utf8');
      const json = JSON.parse(data);
      return json;
    } catch (error) {
      throw error;
    }
  }
  async deleteById(id) {
    try {
      const data = await fs.promises.readFile(this.nombreArchivo, 'utf8');
      const json = JSON.parse(data);
      const result = json.filter((item) => item.id !== id);
      await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(result));
    } catch (error) {
      throw error;
    }
  }
  async deleteAll() {
    try {
      await fs.promises.writeFile(this.nombreArchivo, JSON.stringify([]));
    } catch (error) {
      throw error;
    }
  }
}

exports.Contenedor = Contenedor;
