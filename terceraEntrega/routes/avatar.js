import { Router } from 'express';
import { middlewareDeUnArchivo } from '../multer/procesamientoArchivos.js';

const avatar = Router();

avatar.post('/', middlewareDeUnArchivo, (req, res) => {
  const file = req.file;
  if (!file) {
    const error = new Error('Please upload a file');
    error.httpStatusCode = 400;
    res.json({ error });
  }
  res.send(file);
});

export { avatar };
