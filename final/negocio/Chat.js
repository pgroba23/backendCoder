import Author from './Author.js';

export default class Chat {
	#id;
	#mensaje;
	#author;
	#fecha;

	constructor({ id, mensaje, author, fecha }) {
		this.#id = id;
		this.#mensaje = mensaje;
		this.#author = author;
		this.#fecha = fecha;
	}

	set author(author) {
		this.#author = new Author(
			author.email,
			author.nombre,
			author.apellido,
			author.edad,
			author.alias,
			author.avatar
		);
	}

	get id() {
		return this.#id;
	}

	get mensaje() {
		return this.#mensaje;
	}

	get author() {
		return this.#author;
	}

	get fecha() {
		return this.#fecha;
	}

	datos() {
		return Object.freeze(
			JSON.parse(
				JSON.stringify({
					id: this.#id,
					mensaje: this.#mensaje,
					fecha: this.#fecha,
					author: this.#author,
				})
			)
		);
	}
}
