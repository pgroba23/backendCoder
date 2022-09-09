import { Router } from 'express';
import { auth } from '../middlewares/auth.js';
import {
	getAllbyId,
	saveCart,
	deleteCart,
} from '../controllers/carritoController.js';

const carritos = Router();

carritos.get('/', auth, getAllbyId);

carritos.post('/', auth, saveCart);

carritos.delete('/:id', auth, deleteCart);

export { carritos };
