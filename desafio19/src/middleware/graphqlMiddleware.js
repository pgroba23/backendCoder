import { buildSchema } from 'graphql';
import { graphqlHTTP } from 'express-graphql';

import {
	getProductos,
	getProducto,
	crearProducto,
	updateProducto,
	deleteProducto,
} from './productoController.js';

const schema = buildSchema(`

  input ProductoInput {
    title: String
    price: Int
    thumbnail: String
  }

  type Producto {
    id: ID!
    title: String
    price: Int
    thumbnail: String
  }
  type Query {
    getProducto(id: ID!): Producto
    getProductos: [Producto]
  }
  type Mutation {
    crearProducto(producto: ProductoInput!): Producto
    updateProducto(id: ID!, producto: ProductoInput!): Producto
    deleteProducto(id: ID!): [Producto]
  }
`);

export const graphqlMiddleware = graphqlHTTP({
	schema,
	rootValue: {
		getProductos,
		getProducto,
		crearProducto,
		updateProducto,
		deleteProducto,
	},
	graphiql: true,
});
