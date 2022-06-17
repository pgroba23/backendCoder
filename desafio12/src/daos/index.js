import ChatsDaoMongoDb from './chats/ChatsDaoMongoDb.js';
import ChatsDaoFirebase from './chats/ChatsDaoFirebase.js';
import ChatsDaoArchivo from './chats/ChatsDaoArchivo.js';
import config from '../../config.js';
import dotenv from '../dotenv/dotenv.js';

let chatsDao;

switch (process.env.PERS) {
  case 'archivo':
    const { default: ChatsDaoArchivo } = await import(
      './chats/ChatsDaoArchivo.js'
    );
    chatsDao = new ChatsDaoArchivo(config.fileSystem.path);
    break;
  case 'firebase':
    const { default: ChatsDaoFirebase } = await import(
      './chats/ChatsDaoFirebase.js'
    );
    chatsDao = new ChatsDaoFirebase();
    break;
  default:
    const { default: ChatsDaoMongoDb } = await import(
      './chats/ChatsDaoMongoDb.js'
    );
    chatsDao = new ChatsDaoMongoDb();
    break;
}

export { chatsDao };
