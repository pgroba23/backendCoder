import AuthorDto from './AuthorDto.js';

export default class ChatDto {
	constructor({ id, mensaje, author, fecha }) {
		this.id = id;
		this.mensaje = mensaje;
		this.author = author;
		this.fecha = fecha;
	}

	// set author(author) {
	// 	this.author = new AuthorDto(
	// 		author.email,
	// 		author.nombre,
	// 		author.apellido,
	// 		author.edad,
	// 		author.alias,
	// 		author.avatar
	// 	);
	// }
	datos() {
		return Object.freeze(
			JSON.parse(
				JSON.stringify({
					id: this.id,
					mensaje: this.mensaje,
					fecha: this.fecha,
					author: this.author,
				})
			)
		);
	}
}
