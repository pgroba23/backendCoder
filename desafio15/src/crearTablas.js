import { clienteSql as knex } from './mysql/clienteSql.js';
import { clienteSqlite as knexLite } from './sqlite/clienteSqlite.js';

knex.schema
  .hasTable('productos')
  .then((exists) => {
    if (!exists) {
      knex.schema
        .createTable('productos', (tabla) => {
          tabla.increments('id'),
            tabla.string('title'),
            tabla.integer('price'),
            tabla.string('thumbnail');
        })
        .then(() => {
          console.log('tabla "productos" creada!');
        });
    } else {
      console.log('la tabla "productos" ya existe. no se realizaron cambios');
    }
  })
  .finally(() => {
    knex.destroy();
  });

knexLite.schema
  .hasTable('mensajes')
  .then((exists) => {
    if (!exists) {
      knexLite.schema
        .createTable('mensajes', (tabla) => {
          tabla.increments('id'),
            tabla.string('email'),
            tabla.string('mensaje'),
            tabla.string('fecha');
        })
        .then(() => {
          console.log('tabla "mensajes" creada!');
        });
    } else {
      console.log('la tabla "mensajes" ya existe. no se realizaron cambios');
    }
  })
  .finally(() => {
    knexLite.destroy();
  });
