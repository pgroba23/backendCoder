import { knexConfig } from './knexconfig.js';
import crearKnex from 'knex';

const clienteSqlite = crearKnex(knexConfig);

export { clienteSqlite };
