/**
 *  Created by dalgurak on Thu Nov 01 2018 14:51:51
 */
/*global process:true */
const cluster = require('cluster');
// const os = require('os');
const log = require('./lib/utils/log');
const app = require('./app');
global.Promise = require('bluebird');

if (process.argv[4] === 'debug') {
  app({workerId: 0});
} else {
  if (cluster.isMaster) {
    let numCpus = process.argv[4] !=='product' ? 2 : 3;
    for (let i=0;i<numCpus;i++) {
      cluster.fork();
    }
    
    cluster.on('exit', (worker, code, signal) => {
      log.error(`[%d]worker exit, code:%s, signal:%s`, worker.id, code, signal);
    });
    
    let pid = process.pid;
    // os.setPriority(pid, os.constants.priority.PRIORITY_ABOVE_NORMAL);
    // log.info('Master %d is run, [priority:%d]', pid, os.getPriority());
    log.info('Master %d is run', pid);
  } else if (cluster.isWorker) {
    app({workerId: cluster.worker.id});
    let pid = process.pid;
    // os.setPriority(pid, os.constants.priority.PRIORITY_ABOVE_NORMAL);
    // log.info('[%d] worker %d is run, [priority:%d]', cluster.worker.id, pid, os.getPriority());
    log.info('[%d] worker %d is run', cluster.worker.id, pid);
  }
}