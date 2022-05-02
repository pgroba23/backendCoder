import fs from 'fs';

class Contenedor {
  constructor(nombreArchivo, extension = '.txt') {
    this.nombreArchivo = 'src/' + nombreArchivo + extension;
  }

  async save(data) {
    try {
      const json = await fs.promises.readFile(this.nombreArchivo, 'utf8');
      const id = JSON.parse(json).length + 1;
      const result = [...JSON.parse(json), { ...data, id }];
      await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(result));
    } catch (err) {
      const id = 1;
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
