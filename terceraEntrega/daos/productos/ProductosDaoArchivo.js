import ContenedorArchivo from '../../contenedor/ContenedorArchivo.js';

class ProductoDaoArchivo extends ContenedorArchivo {
  constructor(ruta) {
    super('productos', ruta);
  }
}

export default ProductoDaoArchivo;
