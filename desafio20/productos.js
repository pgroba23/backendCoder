import Router from 'koa-router';
import ProductosRepo from './repositorio/ProductosRepo.js';

export const router = new Router({
	prefix: '/productos',
});

const productos = [];
const productosRepo = new ProductosRepo();

const main = async () => {
	productos.push(...(await productosRepo.listarAll()));
};
main();

/* ---------------------- Routes ----------------------- */
/* API REST Get All */
router.get('/', (ctx) => {
	ctx.body = {
		status: 'success',
		message: productos,
	};
});

/* API REST Get x ID */
router.get('/:id', (ctx) => {
	const getCurrentProduct = productos.filter(function (producto) {
		if (producto.id == ctx.params.id) {
			return true;
		}
	});

	if (getCurrentProduct.length) {
		ctx.body = getCurrentProduct[0];
	} else {
		ctx.response.status = 404;
		ctx.body = {
			status: 'error!',
			message: 'Ese id de producto no existe!',
		};
	}
});

/* API REST Post */
router.post('/', (ctx) => {
	// Check if any of the data field not empty
	if (
		!ctx.request.body.id ||
		!ctx.request.body.title ||
		!ctx.request.body.thumbnail
	) {
		ctx.response.status = 400;
		ctx.body = {
			status: 'error',
			message: 'Mete datos pa',
		};
	} else {
		const newProd = productos.push({
			id: ctx.request.body.id,
			title: ctx.request.body.title,
			thumbnail: ctx.request.body.thumbnail,
		});
		ctx.response.status = 201;
		ctx.body = {
			status: 'success',
			message: `New product added`,
		};
	}
});

/* API REST Put */
router.put('/update/:id', (ctx) => {
	// Check if any of the data field not empty
	if (
		!ctx.request.body.id ||
		!ctx.request.body.title ||
		!ctx.request.body.thumbnail
	) {
		ctx.response.status = 400;
		ctx.body = {
			status: 'error',
			message: 'Mete datos pa',
		};
	} else {
		const id = ctx.params.id;
		const index = productos.findIndex((producto) => producto.id == id);
		productos.splice(index, 1, ctx.request.body);
		ctx.response.status = 201;
		ctx.body = {
			status: 'success',
			message: `Producto actualizado`,
		};
	}
});

/* API REST Delete */
router.delete('/delete/:id', (ctx) => {
	const id = ctx.params.id;
	const index = productos.findIndex((producto) => producto.id == id);
	productos.splice(index, 1);
	ctx.response.status = 200;
	ctx.body = {
		status: 'success',
		message: `Producto borrado`,
	};
});
