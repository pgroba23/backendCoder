import express from 'express';
/* 
import { carritos } from '../routes/carritos.js';
import { pedidos } from '../routes/pedidos.js';*/
import { loginRoute } from '../routes/login.js';
import { productos } from '../routes/productos.js';
import { avatar } from '../routes/avatar.js';
import { clusterFunction } from '../cluster/cluster.js';
import { workerFunction } from '../cluster/worker.js';
import logger from '../log4js/logger.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', loginRoute);
app.use('/api/images', avatar);
app.use('/api/products', productos);

/*

app.use('/api/carritos', carritos);
app.use('/api/pedidos', pedidos);
 */

app.all('*', (req, res) => {
	logger.warn(
		`Ruta: ${req.path} - Metodo: ${req.method} - ${req.url} no implementada`
	);
	res.status(404).json({
		error: -2,
		descripcion: `ruta ${req.url} método ${req.method} no implementada`,
	});
});

if (process.argv[2] == 'cluster') {
	clusterFunction(app);
} else {
	workerFunction(app);
}
