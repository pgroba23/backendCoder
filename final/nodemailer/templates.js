export const adminEmailTemplate = (adminMail, pedido, mail) => {
	return {
		from: 'ECommerce',
		to: adminMail,
		subject: `Nuevo pedido de ${mail}`,
		html: `<h1 style="color: blue;">Detalles: </h1>
		<br />
		ID: ${pedido.id}
		<br />
		Cliente: ${pedido.idCliente}
		<br />
		Fecha: ${pedido.fecha}
		<br />
		Pedido emitido a la central para ser procesado a la brevedad.`,
	};
};

export const userEmailTemplate = (userMail, pedido) => {
	return {
		from: 'ECommerce',
		to: userMail,
		subject: `Ud realizo un nuevo pedido!`,
		html: `<h1 style="color: blue;">Detalles: </h1>
        <br />
		ID: ${pedido.id}
		<br />
		Cliente: ${pedido.idCliente}
		<br />
		Fecha: ${pedido.fecha}
		<br />
		Para mas detalles ingrese a su cuenta.
		<br />
        <h1 style="color: blue;">Gracias por su compra!</h1>`,
	};
};
