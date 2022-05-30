const socket = io();

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
    email: formChat[0].value,
    mensaje: formChat[1].value,
  };

  socket.emit('chatupd', chat);

  formChat[1].value = '';
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

  const html = functionTemplate({ chats });

  document.getElementById('chats').innerHTML = html;
}
