import ContenedorFirebase from '../../contenedor/ContenedorFirebase.js';

class ProductosDaoFirebase extends ContenedorFirebase {
  constructor() {
    super('productos');
  }
}

export default ProductosDaoFirebase;
