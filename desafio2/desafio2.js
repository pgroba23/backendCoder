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

const main = async () => {
  const producto = new Contenedor('./productos.txt');
  await producto.save({
    title: 'Escuadra',
    price: 123.45,
    thumbnail:
      'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
  });

  await producto.save({
    title: 'Calculadora',
    price: 234.56,
    thumbnail:
      'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
  });

  console.log(await producto.getById(1));
  console.log(await producto.getById(2));
  console.log(await producto.getById(3)); //se espera un null

  console.log(await producto.getAll());

  await producto.deleteById(1);
  await producto.deleteAll();
};

main();
