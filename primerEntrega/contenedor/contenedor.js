import fs from 'fs';

class Contenedor {
  constructor(nombreArchivo, extension = '.txt') {
    this.nombreArchivo = nombreArchivo + extension;
  }

  async save(data) {
    try {
      await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(data));
    } catch (err) {
      throw error;
    }
  }

  async getById(id) {
    try {
      const data = await fs.promises.readFile(this.nombreArchivo, 'utf8');
      const json = JSON.parse(data);
      const result = json.find((item) => item.id === id);
      return result ? result : null;
    } catch (error) {
      await fs.promises.writeFile(this.nombreArchivo, JSON.stringify([]));
      return [];
    }
  }
  async getAll() {
    try {
      const data = await fs.promises.readFile(this.nombreArchivo, 'utf8');
      const json = JSON.parse(data);
      return json;
    } catch (error) {
      await fs.promises.writeFile(this.nombreArchivo, JSON.stringify([]));
      return [];
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

export { Contenedor };
