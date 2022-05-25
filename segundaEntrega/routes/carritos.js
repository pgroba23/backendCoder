import { Router } from 'express';
// import { Contenedor } from '../contenedor/contenedor.js';
import { carritosDao } from '../daos/index.js';

const carritos = Router();
const data = [];

const main = async () => {
  data.push(...(await carritosDao.listarAll()));
};
main();

carritos.get('/', async (req, res) => {
  data.length = 0;
  data.push(...(await carritosDao.listarAll()));
  res.json(data);
});

carritos.post('/', async (req, res) => {
  data.push({ id: data.length + 1, productos: [] });
  await carritosDao.guardar(data[data.length - 1]);
  res.json(data[data.length - 1]);
});

carritos.post('/:id/productos', async (req, res) => {
  try {
    const index = data.findIndex((item) => item.id === parseInt(req.params.id));
    data[index].productos.push({ ...req.body, id: new Date().getTime() });
    await carritosDao.actualizar(data[index]);
    res.json(data[index]);
  } catch (error) {
    res.json({ error: 'carrito no encontrado' });
  }
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
  try {
    const index = data.findIndex((item) => item.id === parseInt(req.params.id));
    const index_prod = data[index].productos.findIndex(
      (item) => item.id === parseInt(req.params.id_prod)
    );
    if (index === -1 || index_prod === -1) {
      res.json({ error: 'producto no encontrado' });
    } else {
      data[index].productos.splice(index_prod, 1);
      await carritosDao.actualizar(data[index]);
      res.json(data[index]);
    }
  } catch (error) {
    res.json({ error: 'carrito y/o producto no encontrado' });
  }
});

carritos.delete('/:id', async (req, res) => {
  try {
    const index = data.findIndex((item) => item.id === parseInt(req.params.id));
    data[index].productos = [];
    await carritosDao.actualizar(data[index]);
    res.json(data[index]);
  } catch (error) {
    res.json({ error: 'carrito no encontrado' });
  }
});

export { carritos };
