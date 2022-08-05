import ContenedorFirebase from '../../contenedor/ContenedorFirebase.js';

class ChatsDaoFirebase extends ContenedorFirebase {
  constructor() {
    super('chats');
  }
}

export default ChatsDaoFirebase;
