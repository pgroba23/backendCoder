import { Router } from 'express';
import { fork } from 'child_process';
import logger from '../log4js/logger.js';

export const randoms = Router();

randoms.get('/:num?', (req, res) => {
  logger.info(`Ruta: ${req.url} - Metodo: ${req.method}`);
  let { num } = req.params;
  if (!num) {
    num = 100000000;
  }

  const computo = fork('src/routes/calculo.js');
  computo.on('message', (msg) => {
    if (msg === 'listo') {
      computo.send(num);
    } else {
      res.send(msg);
    }
  });
});
