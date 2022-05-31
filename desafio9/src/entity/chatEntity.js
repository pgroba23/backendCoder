import { normalize, denormalize, schema } from 'normalizr';
import fs from 'fs';
import util from 'util';

function print(objeto) {
  console.log(util.inspect(objeto, false, 12, true));
}
const authorEntity = new schema.Entity('authors', {}, { idAttribute: 'email' });
const chatEntity = new schema.Entity('posts', {
  author: authorEntity,
});

export { chatEntity, print, normalize, denormalize };
