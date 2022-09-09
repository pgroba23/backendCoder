import jwt from 'jsonwebtoken';
import UsuariosRepo from '../persistencia/repositorio/UsuariosRepo.js';
import CarritosRepo from '../persistencia/repositorio/CarritosRepo.js';
import Usuario from '../negocio/Usuario.js';
import Carrito from '../negocio/Carrito.js';
import bCrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

const generateToken = (user) => {
	const token = jwt.sign({ data: user }, process.env.PRIVATE_KEY, {
		expiresIn: '24h',
	});
	return token;
};

const isValidPassword = (user, password) => {
	return bCrypt.compareSync(password, user.password);
};

const createHash = (password) => {
	return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

// REGISTER
export const register = async (req, res) => {
	const usuariosRepo = new UsuariosRepo();
	const carritosRepo = new CarritosRepo();
	const { email, password, name, lastname, phone, image } = req.body;

	const usuarios = await usuariosRepo.listarAll();
	const yaExiste = usuarios.find((usuario) => usuario.email == email);
	if (yaExiste) {
		return res.json({ error: 'ya existe ese usuario' });
	}

	const usuario = {
		id: uuidv4(),
		email,
		password: createHash(password),
		name,
		lastname,
		phone,
		image,
	};

	const carrito = new Carrito({
		id: usuario.id,
		prods: [],
	});

	await usuariosRepo.guardar(new Usuario(usuario));
	await carritosRepo.guardar(carrito);
	const access_token = generateToken(usuario);

	res.json({ access_token });
};

// LOGIN
export const login = async (req, res) => {
	const usuariosRepo = new UsuariosRepo();
	const { email, password } = req.body;

	const usuarios = await usuariosRepo.listarAll();
	const usuario = usuarios.find((usuario) => usuario.email == email);
	if (!usuario) {
		return res.json({ error: 'el usuario no existe' });
	}

	if (!isValidPassword(usuario, password)) {
		return res.json({ error: 'La contraseña es incorrecta' });
	}

	const access_token = generateToken(usuario);

	res.json({ access_token });
};
