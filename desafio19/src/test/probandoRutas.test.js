import axios from 'axios';
import assert from 'assert';

describe('Comportamiento del servidor', () => {
	describe('Probando /info', () => {
		it('devuelve un objecto con informacion del sistema', async () => {
			const data = await axios.get('http://localhost:8080/info');
			assert.equal(data.status, 200);
		});
	});

	describe('Probando /api/randoms', () => {
		it('devuelve numeros random', async () => {
			const data = await axios.get(
				`http://localhost:8080/api/randoms/${1000000}`
			);
			assert.equal(data.status, 200);
		});
	});
});
