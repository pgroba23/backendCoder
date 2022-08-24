import Koa from 'koa';
import koaBody from 'koa-body';
import { router as productos } from './productos.js';
const app = new Koa();

// Set up body parsing middleware
app.use(koaBody());

// Require the Router we defined in productos.js

// Use the Router on the sub route /productos
app.use(productos.routes());

// Server listen
const PORT = 8080;
const server = app.listen(PORT, () => {
	console.log(`Servidor Koa escuchando en el puerto ${server.address().port}`);
});
server.on('error', (error) => console.log('Error en Servidor Koa:', error));
