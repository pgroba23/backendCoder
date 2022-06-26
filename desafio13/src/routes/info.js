import { Router } from 'express';
import os from 'os';

export const info = Router();

info.get('/', (req, res) => {
  // console.dir(process);
  res.send({
    argumentos_entrada: process.argv.slice(2),
    SO: process.platform,
    version_node: process.version,
    RSS: process.memoryUsage().rss,
    PATH_de_ejecucion: process.execPath,
    PROCESS_ID: process.pid,
    Carpeta_del_proyecto: process.cwd(),
    /*número de procesadores presentes en el servidor*/
    numero_de_procesadores: os.cpus().length,
  });
});
