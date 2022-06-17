const socket = io();

const authorEntity = new normalizr.schema.Entity(
  'authors',
  {},
  { idAttribute: 'email' }
);

const chatEntity = new normalizr.schema.Entity(
  'posts',
  {
    author: authorEntity,
  },
  { idAttribute: 'id' }
);

const form = document.getElementById('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const producto = {
    title: form[0].value,
    price: form[1].value,
    thumbnail: form[2].value,
  };

  socket.emit('update', producto);

  form.reset();
});

const formChat = document.getElementById('form-chat');
formChat.addEventListener('submit', (e) => {
  e.preventDefault();

  const chat = {
    id: new Date().getTime().toString(),
    mensaje: formChat[6].value,
    author: {
      email: formChat[0].value,
      nombre: formChat[1].value,
      apellido: formChat[2].value,
      edad: formChat[3].value,
      alias: formChat[4].value,
      avatar: formChat[5].value,
    },
  };

  const normalizedChat = normalizr.normalize(chat, chatEntity);

  socket.emit('chatupd', normalizedChat);

  formChat[6].value = '';
});

socket.on('productos', manejarEvento);

async function manejarEvento(productos) {
  const recursoRemoto = await fetch('plantillas/productList.handlebars');
  const textoPlantilla = await recursoRemoto.text();
  const functionTemplate = Handlebars.compile(textoPlantilla);

  const html = functionTemplate({ productos });

  document.getElementById('productos').innerHTML = html;
}

socket.on('chats', manejarChat);

async function manejarChat(chats) {
  const recursoRemoto = await fetch('plantillas/chatList.handlebars');
  const textoPlantilla = await recursoRemoto.text();
  const functionTemplate = Handlebars.compile(textoPlantilla);

  const chatsDenormalized = normalizr.denormalize(
    chats.result,
    [chatEntity],
    chats.entities
  );

  const html = functionTemplate({ chatsDenormalized });

  document.getElementById('chats').innerHTML = html;
}
