import config from '../config.js';

let productosDao;
let carritosDao;

switch (process.env.PERS) {
  case 'archivo':
    const { default: ProductosDaoArchivo } = await import(
      './productos/ProductosDaoArchivo.js'
    );
    const { default: CarritosDaoArchivo } = await import(
      './carritos/CarritosDaoArchivo.js'
    );
    productosDao = new ProductosDaoArchivo(config.fileSystem.path);
    carritosDao = new CarritosDaoArchivo(config.fileSystem.path);
    break;
  case 'firebase':
    const { default: ProductosDaoFirebase } = await import(
      './productos/ProductosDaoFirebase.js'
    );
    const { default: CarritosDaoFirebase } = await import(
      './carritos/CarritosDaoFirebase.js'
    );
    productosDao = new ProductosDaoFirebase();
    carritosDao = new CarritosDaoFirebase();
    break;
  case 'mongodb':
    const { default: ProductosDaoMongoDb } = await import(
      './productos/ProductosDaoMongoDb.js'
    );
    const { default: CarritosDaoMongoDb } = await import(
      './carritos/CarritosDaoMongoDb.js'
    );
    productosDao = new ProductosDaoMongoDb();
    carritosDao = new CarritosDaoMongoDb();
    break;
  default:
    const { default: ProductosDaoMemoria } = await import(
      './productos/ProductosDaoMemoria.js'
    );
    const { default: CarritosDaoMemoria } = await import(
      './carritos/CarritosDaoMemoria.js'
    );
    productosDao = new ProductosDaoMemoria();
    carritosDao = new CarritosDaoMemoria();
    break;
}

export { productosDao, carritosDao };
