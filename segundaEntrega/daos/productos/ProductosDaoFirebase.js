import ContenedorFirebase from '../../contenedor/ContenedorFirebase';

class ProductoDaoFirebase extends ContenedorFirebase {
  constructor() {
    super('productos');
  }
}

export default ProductoDaoFirebase;
