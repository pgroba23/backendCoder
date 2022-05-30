import { normalize, denormalize, schema } from 'normalizr';
import fs from 'fs';
import util from 'util';

const chats = JSON.parse(fs.readFileSync('./src/entity/chats.json'));

function print(objeto) {
  console.log(util.inspect(objeto, false, 12, true));
}

const authorEntity = new schema.Entity('authors', {}, { idAttribute: 'email' });
const messageEntity = new schema.Entity('mensajes', {}, { idAttribute: 'id' });

const chatEntity = new schema.Entity('posts', {
  author: authorEntity,
});

const normalizedChat = normalize(chats, [chatEntity]);
print(normalizedChat);

export { normalizedChat };
