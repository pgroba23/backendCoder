import ContenedorFirebase from '../../contenedor/ContenedorFirebase.js';

class ProductoDaoFirebase extends ContenedorFirebase {
  constructor() {
    super('productos');
  }
}

export default ProductoDaoFirebase;
