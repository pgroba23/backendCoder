import dotenv from '../dotenv/dotenv.js';

export const soloParaAdmins = (req, res, next) => {
	//console.log('req.user', req.user);
	if (req.user.name === process.env.ADMIN) {
		next();
	} else {
		res.status(403).json({
			error: -1,
			descripcion: `ruta ${req.url} método ${req.method} no autorizada`,
		});
	}
};
