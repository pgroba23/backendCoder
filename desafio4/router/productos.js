const { Router } = require('express');
const { Contenedor } = require('../contenedor');

const productos = Router();
const data = [];
const contenedorProductos = new Contenedor('./productos.txt');

const main = async () => {
  data.push(...(await contenedorProductos.getAll()));
};
main();

productos.get('/', (req, res) => {
  res.json(data);
});

productos.get('/:id', (req, res) => {
  res.json(
    data.filter((item) => item.id === parseInt(req.params.id)).length !== 0
      ? data.filter((item) => item.id === parseInt(req.params.id))
      : { error: 'producto no encontrado' }
  );
});

productos.post('/', (req, res) => {
  data.push({ ...req.body, id: data.length + 1 });
  res.json(data[data.length - 1]);
});

productos.put('/:id', (req, res) => {
  const index = data.findIndex((item) => item.id === parseInt(req.params.id));
  data[index] = { ...data[index], ...req.body };
  res.json(data[index]);
});

productos.delete('/:id', (req, res) => {
  data.splice(
    data.findIndex((item) => item.id === parseInt(req.params.id)),
    1
  );
  res.json(data);
});

exports.productos = productos;
