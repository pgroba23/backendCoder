import express from 'express';

import { engine } from 'express-handlebars';
import { Server as HttpServer } from 'http';
import { graphqlMiddleware } from '../middleware/graphqlMiddleware.js';
import { info } from './info.js';
import { randoms } from './randoms.js';
import { produTest } from './producto-test.js';
import logger from '../log4js/logger.js';
import { serverSocket } from './serverSocket.js';
import { login, soloParaAdmins } from './login.js';

const app = express();
const httpServer = new HttpServer(app);

const handlebarsConfig = {
	defaultLayout: 'index.handlebars',
	layoutsDir: './src/views/layouts',
};

const scripts = [{ script: ['js/main.js'] }];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// configuro el socket
serverSocket(httpServer);

app.engine('handlebars', engine(handlebarsConfig));
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.use('/info', info);
app.use('/api/randoms', randoms);
app.use('/productos-test', produTest);
app.use('/graphql', graphqlMiddleware);
app.use('/', login);

app.get('/', soloParaAdmins, (req, res) => {
	logger.info(`Ruta: ${req.path} - Metodo: ${req.method}`);
	console.log(`PID WORKER ${process.pid}`);
	res.render('main', { scripts, usuario: req.user.username });
});

app.use(express.static('public'));

app.all('*', (req, res) => {
	const { url, method } = req;
	logger.warn(
		`Ruta: ${req.path} - Metodo: ${req.method} - ${url} no implementada`
	);
	res.send(`Ruta ${method} ${url} no está implementada`);
});

const PORT = process.env.PORT || 8080;

const connectedServer = httpServer.listen(PORT, () => {
	logger.info(
		`Servidor http escuchando en el puerto ${
			connectedServer.address().port
		} - PID WORKER ${process.pid}`
	);
	console.log(
		`Servidor http escuchando en el puerto ${
			connectedServer.address().port
		} - PID WORKER ${process.pid}`
	);
});
connectedServer.on('error', (error) =>
	logger.error(`Error en servidor ${error}`)
);
