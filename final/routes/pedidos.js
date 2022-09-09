import { Router } from 'express';
import { auth } from '../middlewares/auth.js';
import { getAllbyId, saveOrder } from '../controllers/pedidoController.js';

const pedidos = Router();

pedidos.get('/', auth, getAllbyId);

pedidos.post('/', auth, saveOrder);

export { pedidos };
