import ContenedorArchivo from '../../contenedor/ContenedorArchivo.js';

class ChatsDaoArchivo extends ContenedorArchivo {
  constructor(ruta) {
    super('chats', ruta);
  }
}

export default ChatsDaoArchivo;
