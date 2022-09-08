import dotenv from '../dotenv/dotenv.js';
import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return res.status(401).json({
			error: 'not authenticated',
		});
	}

	const token = authHeader.split(' ')[1];
	//console.log('token', token);

	jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
		if (err) {
			return res.status(403).json({
				error: 'not authorized',
			});
		}
		req.user = decoded.data;
		next();
	});
};
