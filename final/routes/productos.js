import { Router } from 'express';
import { soloParaAdmins } from '../middlewares/admin.js';
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

productos.post('/', soloParaAdmins, savePrd);

productos.put('/:id', soloParaAdmins, updatePrd);

productos.delete('/:id', soloParaAdmins, deletePrd);

export { productos };
