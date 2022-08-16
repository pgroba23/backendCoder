import ProductosRepo from '../persistencia/repositorio/ProductosRepo.js';
import Producto from '../negocio/Producto.js';

const productos = [];
const productosRepo = new ProductosRepo();

const main = async () => {
	productos.push(...(await productosRepo.listarAll()));
};
main();

export const getProductos = () => {
	return productos;
};

export const getProducto = (id) => {
	return productos.find((producto) => producto.id === id);
};

export const crearProducto = (producto) => {
	const data = new Producto({
		...producto,
		id: new Date().getTime().toString(),
	});
	productos.push(data.datos());
	productosRepo.guardar(data);
	return data.datos();
};

export const updateProducto = (id, producto) => {
	const data = new Producto({
		...producto,
		id: new Date().getTime().toString(),
	});
	const index = productos.findIndex((p) => p.id === id);
	productos[index] = data.datos();
	productosRepo.guardar(data);
	return data.datos();
};

export const deleteProducto = (id) => {
	const index = productos.findIndex((p) => p.id === id);
	productos.splice(index, 1);
	productosRepo.eliminar(id);
	return productos;
};
