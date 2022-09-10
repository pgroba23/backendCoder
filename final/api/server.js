import express from 'express';

import { Server as HttpServer } from 'http';
import { engine } from 'express-handlebars';
import { serverSocket } from '../routes/serverSocket.js';
import { pedidos } from '../routes/pedidos.js';
import { info } from '../routes/info.js';
import { carritos } from '../routes/carritos.js';
import { loginRoute, registerRoute } from '../routes/login.js';
import { productos } from '../routes/productos.js';
import { avatar } from '../routes/avatar.js';
import { clusterFunction } from '../cluster/cluster.js';
import { workerFunction } from '../cluster/worker.js';
import logger from '../log4js/logger.js';

const app = express();
const httpServer = new HttpServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const handlebarsConfig = {
	defaultLayout: 'index.handlebars',
	layoutsDir: './views/layouts',
};

app.engine('handlebars', engine(handlebarsConfig));
app.set('view engine', 'handlebars');
app.set('views', './views');

serverSocket(httpServer);

app.use('/', loginRoute);
app.use('/api/users', registerRoute);
app.use('/api/images', avatar);
app.use('/api/products', productos);
app.use('/api/shoppingcartproducts', carritos);
app.use('/api/orders', pedidos);
app.use('/info', info);

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
