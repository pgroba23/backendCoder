const express = require('express');
const exphbs = require('express-handlebars');
const { Contenedor } = require('./contenedor');

const productos = [];
const contenedorProductos = new Contenedor('./productos.txt');

const main = async () => {
  productos.push(...(await contenedorProductos.getAll()));
};
main();

const app = express();
app.use(express.urlencoded({ extended: true }));

const handlebarsConfig = {
  defaultLayout: 'index.handlebars',
};

app.engine('handlebars', exphbs(handlebarsConfig));

app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('productForm');
});

app.post('/productos', (req, res) => {
  productos.push({ ...req.body, id: productos.length + 1 });
  console.log(productos);
  res.redirect('/');
});

app.get('/productos', (req, res) => {
  res.render('productList', { productos });
});

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});
server.on('error', (error) => console.log(`Error en servidor ${error}`));
