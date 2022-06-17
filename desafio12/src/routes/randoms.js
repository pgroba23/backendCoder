import { Router } from 'express';
import { fork } from 'child_process';

export const randoms = Router();

randoms.get('/:num?', (req, res) => {
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
