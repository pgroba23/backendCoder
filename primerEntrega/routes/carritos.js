import { Router } from 'express';
import { Contenedor } from '../contenedor/contenedor.js';

const carritos = Router();
const data = [];
const contenedorCarritos = new Contenedor('carritos');

const main = async () => {
  data.push(...(await contenedorCarritos.getAll()));
};
main();

carritos.get('/', async (req, res) => {
  res.json(data);
});

carritos.post('/', async (req, res) => {
  data.push({ id: data.length + 1, productos: [] });
  await contenedorCarritos.save(data);
  res.json(data[data.length - 1]);
});

carritos.post('/:id/productos', async (req, res) => {
  const index = data.findIndex((item) => item.id === parseInt(req.params.id));
  data[index].productos.push({ ...req.body, id: new Date().getTime() });
  await contenedorCarritos.save(data);
  res.json(data[index]);
});

carritos.get('/:id/productos', (req, res) => {
  try {
    const index = data.findIndex((item) => item.id === parseInt(req.params.id));
    res.json(data[index].productos);
  } catch (error) {
    res.json({ error: 'carrito no encontrado' });
  }
});

carritos.delete('/:id/productos/:id_prod', async (req, res) => {
  const index = data.findIndex((item) => item.id === parseInt(req.params.id));
  const index_prod = data[index].productos.findIndex(
    (item) => item.id === parseInt(req.params.id_prod)
  );
  data[index].productos.splice(index_prod, 1);
  await contenedorCarritos.save(data);
  res.json(data[index]);
});

carritos.delete('/:id', async (req, res) => {
  const index = data.findIndex((item) => item.id === parseInt(req.params.id));
  data[index].productos = [];
  await contenedorCarritos.save(data);
  res.json(data[index]);
});

export { carritos };
