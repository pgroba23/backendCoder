import express from 'express';
import { productos } from '../routes/productos.js';
import { carritos } from '../routes/carritos.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', productos);
app.use('/api/carritos', carritos);

// app.get('/', (req, res) => {
//   res.send('soy genial');
// });

// app.post('/', soloParaAdmins, (req, res) => {
//   res.send('soy genial');
// });

app.all('*', (req, res) => {
  res.status(404).json({
    error: -2,
    descripcion: `ruta ${req.url} método ${req.method} no implementada`,
  });
});

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});
server.on('error', (error) => console.log(`Error en servidor ${error}`));
