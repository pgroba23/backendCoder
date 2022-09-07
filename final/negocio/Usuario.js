//import { v4 as uuidv4 } from 'uuid';

export default class Usuario {
	#id;
	#email;
	#password;
	#name;
	#lastname;
	#phone;
	#image;

	constructor({ id, email, password, name, lastname, phone, image }) {
		this.#id = id;
		this.#email = email;
		this.#password = password;
		this.#name = name;
		this.#lastname = lastname;
		this.#phone = phone;
		this.#image = image;
	}

	/**getters */
	get id() {
		return this.#id;
	}
	get email() {
		return this.#email;
	}
	get password() {
		return this.#password;
	}
	get name() {
		return this.#name;
	}
	get lastname() {
		return this.#lastname;
	}
	get image() {
		return this.#image;
	}
	get phone() {
		return this.#phone;
	}

	/**setters */
	set id(id) {
		this.#id = id;
	}
	set email(email) {
		this.#email = email;
	}
	set password(password) {
		this.#password = password;
	}
	set name(name) {
		this.#name = name;
	}
	set lastname(lastname) {
		this.#lastname = lastname;
	}
	set image(image) {
		this.#image = image;
	}
	set phone(phone) {
		this.#phone = phone;
	}

	datos() {
		return Object.freeze(
			JSON.parse(
				JSON.stringify({
					id: this.#id,
					email: this.#email,
					password: this.#password,
					name: this.#name,
					lastname: this.#lastname,
					phone: this.#phone,
					image: this.#image,
				})
			)
		);
	}
}
