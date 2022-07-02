const calculo = (num) => {
  const numbers = {};
  for (let i = 0; i < num; i++) {
    numbers[Math.floor(Math.random() * 1000) + 1] =
      numbers[Math.floor(Math.random() * 1000) + 1] + 1 || 1;
  }
  return numbers;
};

process.on('message', (msg) => {
  const numbers = calculo(msg);
  process.send(numbers);
});

process.send('listo');
