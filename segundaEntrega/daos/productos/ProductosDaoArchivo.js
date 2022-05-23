import ContenedorArchivo from '../../contenedor/ContenedorArchivo';

class ProductoDaoArchivo extends ContenedorArchivo {
  constructor(ruta) {
    super('productos', ruta);
  }
}

export default ProductoDaoArchivo;
