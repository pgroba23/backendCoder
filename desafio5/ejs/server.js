const express = require('express');
const { Contenedor } = require('./contenedor');

const productos = [];
const contenedorProductos = new Contenedor('./productos.txt');

const main = async () => {
  productos.push(...(await contenedorProductos.getAll()));
};
main();

const app = express();
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('formulario');
});

app.post('/productos', (req, res) => {
  productos.push({ ...req.body, id: productos.length + 1 });
  console.log(productos);
  res.redirect('/');
});

app.get('/productos', (req, res) => {
  res.render('lista', { productos });
});

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});
server.on('error', (error) => console.log(`Error en servidor ${error}`));
