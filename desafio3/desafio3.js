const express = require('express');
const fs = require('fs');

const PORT = 8080;
const app = express();
let productos;

class Contenedor {
  constructor(nombreArchivo) {
    this.nombreArchivo = nombreArchivo;
  }
  static id = 1;

  async getAll() {
    try {
      const data = await fs.promises.readFile(this.nombreArchivo, 'utf8');
      //   const json = JSON.parse(data);
      //   return json;
      return data;
    } catch (error) {
      throw error;
    }
  }
}

const main = async () => {
  productos = await new Contenedor('productos.txt').getAll();
};

main();

app.get('/productos', (req, res) => {
  res.send(productos);
});

app.get('/productosRandom', (req, res) => {
  const json = JSON.parse(productos);
  const random = JSON.stringify(json[Math.floor(Math.random() * json.length)]);
  res.send(random);
});

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on('error', (error) => console.log(`Error en servidor ${error}`));
