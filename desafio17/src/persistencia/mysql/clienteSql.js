import { knexConfig } from './knexconfig.js';
import crearKnex from 'knex';

const clienteSql = crearKnex(knexConfig);

export { clienteSql };
