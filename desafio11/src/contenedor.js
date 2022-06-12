import knexLib from 'knex';

class Contenedor {
  constructor(nombreTabla, config) {
    this.knex = knexLib(config);
    this.tabla = nombreTabla;
  }

  async save(data) {
    return this.knex(this.tabla).insert(data);
  }

  async getById(id) {
    return this.knex(this.tabla).where('id', id).select('*');
  }
  async getAll() {
    return this.knex(this.tabla).select('*');
  }
  async deleteById(id) {
    return this.knex(this.tabla).where('id', id).del();
  }
  async deleteAll() {
    return this.knex(this.tabla).del();
  }
}

export { Contenedor };
