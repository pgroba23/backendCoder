import ContenedorArchivo from '../../contenedor/ContenedorArchivo.js';

class CarritoDaoArchivo extends ContenedorArchivo {
  constructor(ruta) {
    super('carritos', ruta);
  }
}

export default CarritoDaoArchivo;
