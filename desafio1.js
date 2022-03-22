class Usuario {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = [libros];
    this.mascotas = [mascotas];
  }
  getFullName() {
    return `${this.nombre} ${this.apellido}`;
  }

  addMascota(nombre) {
    this.mascotas.push(nombre);
  }

  countMascotas() {
    return this.mascotas.length;
  }

  addBook(nombre, autor) {
    this.libros = [...this.libros, { nombre, autor }];
  }

  getBookNames() {
    let result = [];
    this.libros.forEach((element) => {
      result.push(element['nombre']);
    });

    return result;
  }
}

const user = new Usuario(
  'Pablo',
  'Groba',
  { nombre: 'Dracula', autor: 'Ni idea' },
  'Coqui'
);

console.log('Obj: ');
console.log(user);

console.log('Libros antes de agregar uno nuevo');
console.log(user.getBookNames());
console.log('Libros luego de agregar uno nuevo');
user.addBook('Sarasa', 'Pablo Gomez');
console.log(user.getBookNames());

console.log('Cantidad de mascotas antes de agregar una nueva');
console.log(user.countMascotas());
console.log('Cantidad de mascotas dsp de agregar una nueva');
user.addMascota('Michi');
console.log(user.countMascotas());

console.log('Full Name');
console.log(user.getFullName());
