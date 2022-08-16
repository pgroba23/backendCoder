import { Router } from 'express';
import os from 'os';
import compression from 'compression';
import logger from '../log4js/logger.js';

export const info = Router();

info.get('/', compression(), (req, res) => {
	logger.info(`Ruta: ${req.url} - Metodo: ${req.method}`);
	res.send({
		argumentos_entrada: process.argv.slice(2),
		SO: process.platform,
		version_node: process.version,
		RSS: process.memoryUsage().rss,
		PATH_de_ejecucion: process.execPath,
		PROCESS_ID: process.pid,
		Carpeta_del_proyecto: process.cwd(),
		numero_de_procesadores: os.cpus().length,
	});
});
