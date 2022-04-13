const express = require('express');
const { productos } = require('./router/productos');
// const { routerMascotas } = require("./router/mascotas")
// const { routerPersonas } = require("./router/personas")

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

/* Cargo los routers */

app.use('/api/productos', productos);

/* Server Listen */
const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});
server.on('error', (error) => console.log(`Error en servidor ${error}`));
