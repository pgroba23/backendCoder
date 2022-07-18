import cluster from 'cluster';
import os from 'os';
import { workerFunction } from './worker.js';
const numCPUs = os.cpus().length;

export const clusterFunction = (server) => {
  /* MASTER */
  if (cluster.isPrimary) {
    console.log(`PID MASTER ${process.pid}`);

    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker) => {
      console.log(
        'Worker',
        worker.process.pid,
        'died',
        new Date().toLocaleString()
      );
      cluster.fork();
    });
  } else {
    /* --------------------------------------------------------------------------- */
    /* WORKERS */
    workerFunction(server);
  }
};
