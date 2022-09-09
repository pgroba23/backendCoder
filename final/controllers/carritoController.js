import CarritosRepo from '../persistencia/repositorio/CarritosRepo.js';
import ProductosRepo from '../persistencia/repositorio/ProductosRepo.js';
import Carrito from '../negocio/Carrito.js';

const carritosRepo = new CarritosRepo();
const productosRepo = new ProductosRepo();

export const getAllbyId = async (req, res) => {
	res.json(await carritosRepo.listar(req.user.id));
};

export const saveCart = async (req, res) => {
	const producto = await productosRepo.listar(req.body.productId);
	if (!producto) {
		res.status(404).json({ error: 'Producto no encontrado' });
		return;
	}
	const carrito = await carritosRepo.listar(req.user.id);
	if (!carrito) {
		res.status(500).json({
			error: 'Error inesperado, no existe carrito para usuario logueado',
		});
		return;
	}

	const index = carrito.prods.findIndex(
		(item) => item.prod.id === req.body.productId
	);
	if (index === -1) {
		carrito.prods.push({
			prod: producto,
			cant: parseInt(1),
		});
	} else {
		carrito.prods[index].cant++;
	}

	await carritosRepo.actualizar(new Carrito(carrito));
	res.json(await carritosRepo.listar(req.user.id));
};

export const deleteCart = async (req, res) => {
	const carrito = await carritosRepo.listar(req.user.id);
	if (!carrito) {
		res.status(500).json({
			error: 'Error inesperado, no existe carrito para usuario logueado',
		});
		return;
	}
	const index = carrito.prods.findIndex(
		(item) => item.prod.id === req.params.id
	);
	if (index === -1) {
		res.status(404).json({ error: 'Producto no encontrado' });
		return;
	}
	carrito.prods.splice(index, 1);
	await carritosRepo.actualizar(new Carrito(carrito));
	res.json(await carritosRepo.listar(req.user.id));
};
