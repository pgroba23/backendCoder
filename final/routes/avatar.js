import { Router } from 'express';
import { middlewareDeUnArchivo } from '../middlewares/multer.js';
import { multerController } from '../controllers/multerController.js';

const avatar = Router();

avatar.post('/', middlewareDeUnArchivo, multerController);

export { avatar };
