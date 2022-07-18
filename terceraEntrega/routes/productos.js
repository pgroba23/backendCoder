import { Router } from 'express';
import { productosDao } from '../daos/index.js';
import { soloParaAdmins } from '../api/admin.js';

const productos = Router();
const data = [];

const main = async () => {
  productosDao.inicializar();
  data.push(...(await productosDao.listarAll()));
};
main();

productos.get('/', (req, res) => {
  res.json(data);
});

productos.get('/:id', async (req, res) => {
  const result = await productosDao.listar(req.params.id);
  res.json(result ? result : { error: 'No existe el producto' });
});

productos.post('/', soloParaAdmins, async (req, res) => {
  data.push({ ...req.body, id: new Date().getTime() });
  await productosDao.guardar(data[data.length - 1]);
  res.json(data[data.length - 1]);
});

productos.put('/:id', soloParaAdmins, async (req, res) => {
  const index = data.findIndex((item) => item.id === parseInt(req.params.id));
  data[index] = { ...data[index], ...req.body };
  await productosDao.actualizar(data[index]);
  res.json(data[index]);
});

productos.delete('/:id', soloParaAdmins, async (req, res) => {
  data.splice(
    data.findIndex((item) => item.id === parseInt(req.params.id)),
    1
  );
  await productosDao.eliminar(parseInt(req.params.id));
  res.json(data);
});

export { productos };
