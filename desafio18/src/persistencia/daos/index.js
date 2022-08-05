//import ChatsDaoMongoDb from './chats/ChatsDaoMongoDb.js';
import ChatsDaoFirebase from "./chats/ChatsDaoFirebase.js";
import ChatsDaoArchivo from "./chats/ChatsDaoArchivo.js";
import ProductosDaoFirebase from "./productos/ProductosDaoFirebase.js";
import config from "../../../config.js";

let chatsDao,
  productosDao = null;

const PERS = "firebase";

switch (PERS) {
  case "firebase":
    const { default: ChatsDaoFirebase } = await import(
      "./chats/ChatsDaoFirebase.js"
    );
    const { default: ProductosDaoFirebase } = await import(
      "./productos/ProductosDaoFirebase.js"
    );
    chatsDao = new ChatsDaoFirebase();
    productosDao = new ProductosDaoFirebase();
    break;
  default:
    const { default: ChatsDaoArchivo } = await import(
      "./chats/ChatsDaoArchivo.js"
    );
    chatsDao = new ChatsDaoArchivo(config.fileSystem.path);
    break;
}

export { chatsDao, productosDao };
