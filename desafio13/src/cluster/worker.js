export const workerFunction = (httpServer) => {
  const PORT = parseInt(process.argv[2]) || 8080;

  const connectedServer = httpServer.listen(PORT, () => {
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
