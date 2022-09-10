import ProductosDaoMongoDb from './productos/ProductosDaoMongoDb.js';
import UsuarioDaoMongoDb from './usuarios/UsuarioDaoMongoDb.js';
import CarritosDaoMongoDb from './carritos/CarritosDaoMongoDb.js';
import PedidosDaoMongoDb from './pedidos/PedidosDaoMongoDb.js';
import ChatsDaoMongoDb from './chats/ChatsDaoMongoDb.js';

const productosDao = new ProductosDaoMongoDb();
const usuarioDao = new UsuarioDaoMongoDb();
const carritosDao = new CarritosDaoMongoDb();
const pedidosDao = new PedidosDaoMongoDb();
const chatsDao = new ChatsDaoMongoDb();

export { productosDao, usuarioDao, carritosDao, pedidosDao, chatsDao };
