import { Router } from 'express';
import { soloParaAdmins } from '../middlewares/admin.js';
import { auth } from '../middlewares/auth.js';
import {
	getAll,
	getAllbyId,
	savePrd,
	updatePrd,
	deletePrd,
} from '../controllers/productoController.js';

const productos = Router();

productos.get('/', getAll);

productos.get('/:id', getAllbyId);

productos.post('/', auth, soloParaAdmins, savePrd);

productos.put('/:id', auth, soloParaAdmins, updatePrd);

productos.delete('/:id', auth, soloParaAdmins, deletePrd);

export { productos };
