export default class Author {
	#email;
	#nombre;
	#apellido;
	#edad;
	#alias;
	#avatar;

	constructor({ email, nombre, apellido, edad, alias, avatar }) {
		this.#email = email;
		this.#nombre = nombre;
		this.#apellido = apellido;
		this.#edad = edad;
		this.#alias = alias;
		this.#avatar = avatar;
	}

	get email() {
		return this.#email;
	}

	get nombre() {
		return this.#nombre;
	}

	get apellido() {
		return this.#apellido;
	}

	get edad() {
		return this.#edad;
	}

	get alias() {
		return this.#alias;
	}

	get avatar() {
		return this.#avatar;
	}

	datos() {
		return Object.freeze(
			JSON.parse(
				JSON.stringify({
					email: this.#email,
					nombre: this.#nombre,
					apellido: this.#apellido,
					edad: this.#edad,
					alias: this.#alias,
					avatar: this.#avatar,
				})
			)
		);
	}
}
