import ProductosRepo from '../persistencia/repositorio/ProductosRepo.js';
import Producto from '../negocio/Producto.js';
import { v4 as uuidv4 } from 'uuid';

const productosRepo = new ProductosRepo();

/* const main = async () => {
	data.push(...(await productosRepo.listarAll()));
};
main(); */

export const getAll = async (req, res) => {
	res.json(await productosRepo.listarAll());
};

export const getAllbyId = async (req, res) => {
	res.json(await productosRepo.listar(req.params.id));
};

export const savePrd = async (req, res) => {
	const nuevoPrd = new Producto({
		id: uuidv4(),
		name: req.body.name,
		description: req.body.description,
		price: req.body.price,
		image: req.body.image,
	});
	await productosRepo.guardar(nuevoPrd);
	res.json(nuevoPrd.datos());
};

export const updatePrd = async (req, res) => {
	const result = await productosRepo.listar(req.params.id);
	const data = { ...result, ...req.body };
	const nuevoPrd = new Producto(data);
	await productosRepo.actualizar(nuevoPrd);
	res.json(await productosRepo.listar(req.params.id));
};

export const deletePrd = async (req, res) => {
	await productosRepo.eliminar(req.params.id);
	res.json(await productosRepo.listarAll());
};
