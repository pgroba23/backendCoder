export const knexConfig = {
  client: 'sqlite3',
  connection: {
    filename: './src/DB/ecommerce.sqlite',
  },
  useNullAsDefault: true,
};
