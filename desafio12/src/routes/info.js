import { Router } from 'express';

export const info = Router();

info.get('/', (req, res) => {
  console.dir(process);
  res.send({
    argumentos_entrada: process.argv.slice(2),
    SO: process.platform,
    version_node: process.version,
    RSS: process.memoryUsage().rss,
    PATH_de_ejecucion: process.execPath,
    PROCESS_ID: process.pid,
    Carpeta_del_proyecto: process.cwd(),
  });
});
