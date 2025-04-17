"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runNodeCluster = void 0;
const node_cluster_1 = __importDefault(require("node:cluster"));
const node_os_1 = require("node:os");
const numCPUs = (0, node_os_1.availableParallelism)();
console.log(`[NODE_ENV: ${process.env.NODE_ENV}] Forking ${numCPUs} workers.`);
const runNodeCluster = (runServer) => {
    if (node_cluster_1.default.isPrimary) {
        console.log(`Primary ${process.pid} is running`);
        // Fork workers.
        for (let i = 0; i < numCPUs; i++) {
            node_cluster_1.default.fork();
        }
        node_cluster_1.default.on('exit', (worker, code, signal) => {
            console.log(`worker ${worker.process.pid} died`);
        });
    }
    else {
        console.log(`Worker ${process.pid} started`);
        runServer(undefined);
    }
};
exports.runNodeCluster = runNodeCluster;
