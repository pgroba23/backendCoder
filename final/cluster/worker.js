export const workerFunction = (server) => {
  const PORT = 8080;

  const connectedServer = server.listen(PORT, () => {
    console.log(
      `Servidor http escuchando en el puerto ${
        connectedServer.address().port
      } - PID WORKER ${process.pid}`
    );
  });
  connectedServer.on('error', (error) =>
    console.log(`Error en servidor ${error}`)
  );
};
