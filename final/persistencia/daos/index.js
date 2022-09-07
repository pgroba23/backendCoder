import ProductosDaoMongoDb from './productos/ProductosDaoMongoDb.js';
import UsuarioDaoMongoDb from './usuarios/UsuarioDaoMongoDb.js';
//import CarritosDaoMongoDb from './carritos/CarritosDaoMongoDb.js';

const productosDao = new ProductosDaoMongoDb();
const usuarioDao = new UsuarioDaoMongoDb();
//const carritosDao = new CarritosDaoMongoDb();

export { productosDao, usuarioDao /* , carritosDao */ };
