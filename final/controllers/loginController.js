import jwt from 'jsonwebtoken';
import UsuariosRepo from '../persistencia/repositorio/UsuariosRepo.js';
import Usuario from '../negocio/Usuario.js';

function generateToken(user) {
	const token = jwt.sign({ data: user }, process.env.PRIVATE_KEY, {
		expiresIn: '24h',
	});
	return token;
}

// REGISTER
export const register = (req, res) => {
	const { email, password, name, lastname, phone, image } = req.body;

	const usuarios = UsuariosRepo.listarAll();
	const yaExiste = usuarios.find((usuario) => usuario.name == name);
	if (yaExiste) {
		return res.json({ error: 'ya existe ese usuario' });
	}

	const usuario = { email, password, name, lastname, phone, image };
	UsuariosRepo.guardar(new Usuario(usuario));
	const access_token = generateToken(usuario);

	res.json({ access_token });
};

// LOGIN
export const login = (req, res) => {
	const { nombre, password } = req.body;

	const usuario = usuarios.find(
		(usuario) => usuario.nombre == nombre && usuario.password == password
	);
	if (!usuario) {
		return res.json({ error: 'credenciales invalidas' });
	}

	const access_token = generateToken(usuario);

	res.json({ access_token });
};
