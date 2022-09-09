import PedidosRepo from '../persistencia/repositorio/PedidosRepo.js';
import CarritosRepo from '../persistencia/repositorio/CarritosRepo.js';
import Pedido from '../negocio/Pedido.js';
import Carrito from '../negocio/Carrito.js';
import { transporter } from '../nodemailer/config.js';
import {
	adminEmailTemplate,
	userEmailTemplate,
} from '../nodemailer/templates.js';
import { v4 as uuidv4 } from 'uuid';

const pedidosRepo = new PedidosRepo();
const carritosRepo = new CarritosRepo();

export const getAllbyId = async (req, res) => {
	const pedidos = await pedidosRepo.listarAll();
	const pedidosFiltrados = pedidos.filter(
		(pedido) => pedido.idCliente === req.user.id
	);
	res.json(pedidosFiltrados);
};

export const saveOrder = async (req, res) => {
	const carrito = await carritosRepo.listar(req.user.id);
	if (!carrito) {
		res.status(500).json({ error: 'Error inesperado, carrito no encontrado' });
		return;
	}
	const pedido = new Pedido({
		id: uuidv4(),
		idCliente: req.user.id,
		fecha: new Date().toLocaleString(),
		prods: carrito.prods,
	});
	await pedidosRepo.guardar(pedido);
	await carritosRepo.actualizar(new Carrito({ id: req.user.id, prods: [] }));
	/* email */

	const adminMail = adminEmailTemplate(
		process.env.ADMIN_MAIL,
		pedido.datos(),
		req.user.email
	);
	const userMail = userEmailTemplate(req.user.email, pedido.datos());

	try {
		await transporter.sendMail(adminMail);
		await transporter.sendMail(userMail);
	} catch (error) {
		console.log(error);
	}

	res.json(await pedidosRepo.listar(pedido.id));
};
