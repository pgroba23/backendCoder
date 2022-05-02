import { Router } from 'express';
import { Contenedor } from '../contenedor/contenedor.js';
import { soloParaAdmins } from '../api/admin.js';

const productos = Router();
const data = [];
const contenedorProductos = new Contenedor('../productos.txt');

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

productos.post('/', soloParaAdmins, async (req, res) => {
  data.push({ ...req.body, id: data.length + 1 });
  await contenedorProductos.save(req.body);
  res.json(data[data.length - 1]);
});

productos.put('/:id', soloParaAdmins, async (req, res) => {
  const index = data.findIndex((item) => item.id === parseInt(req.params.id));
  data[index] = { ...data[index], ...req.body };
  await contenedorProductos.save(data[index]);
  res.json(data[index]);
});

productos.delete('/:id', soloParaAdmins, async (req, res) => {
  data.splice(
    data.findIndex((item) => item.id === parseInt(req.params.id)),
    1
  );
  await contenedorProductos.save(data);
  res.json(data);
});

export { productos };
