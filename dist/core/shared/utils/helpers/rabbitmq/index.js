"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rabbitMQ_RPC_Helper = exports.rabbitMQ_PubSub_Helper = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
const guid_typescript_1 = require("guid-typescript");
const env_1 = require("../../../../config/env");
class RabbitMQ_PubSub_Helper {
    constructor() {
        this.url = env_1.RABBITMQ_URL;
    }
    async sendAsync(queue, message) {
        const connection = await amqplib_1.default.connect(this.url);
        const channel = await connection.createChannel();
        await channel.assertQueue(queue, { durable: false });
        await channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
        setTimeout(() => {
            connection.close();
        }, 500);
    }
    async receiveAsync(queue) {
        const connection = await amqplib_1.default.connect(this.url);
        const channel = await connection.createChannel();
        await channel.assertQueue(queue, { durable: false });
        return new Promise((resolve, reject) => {
            try {
                channel.consume(queue, (msg) => {
                    console.log(' [x] Received %s', msg === null || msg === void 0 ? void 0 : msg.content.toString());
                    resolve(JSON.parse(msg === null || msg === void 0 ? void 0 : msg.content.toString()));
                }, {
                    noAck: true,
                });
            }
            catch (ex) {
                reject(ex);
            }
        });
    }
}
class RabbitMQ_RPC_Helper {
    constructor() {
        this.url = env_1.RABBITMQ_URL;
    }
    async requestAsync(queue, message) {
        const connection = await amqplib_1.default.connect(this.url);
        const channel = await connection.createChannel();
        const replyQueue = await channel.assertQueue('', { exclusive: true });
        const correlationId = guid_typescript_1.Guid.create().toString();
        await channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
            correlationId: correlationId,
            replyTo: replyQueue.queue,
        });
        return new Promise((resolve, reject) => {
            try {
                channel.consume(replyQueue.queue, (msg) => {
                    if ((msg === null || msg === void 0 ? void 0 : msg.properties.correlationId) === correlationId) {
                        resolve(JSON.parse(msg.content.toString()));
                    }
                }, {
                    noAck: true,
                });
            }
            catch (ex) {
                reject(ex);
            }
        });
    }
    async receiveAsync(queue) {
        const connection = await amqplib_1.default.connect(this.url);
        const channel = await connection.createChannel();
        await channel.assertQueue(queue, { durable: false });
        return new Promise((resolve, reject) => {
            try {
                channel.consume(queue, (msg) => {
                    const replyTo = msg === null || msg === void 0 ? void 0 : msg.properties.replyTo;
                    const correlationId = msg === null || msg === void 0 ? void 0 : msg.properties.correlationId;
                    let request = JSON.parse(msg === null || msg === void 0 ? void 0 : msg.content.toString());
                    resolve({ request, replyTo, correlationId });
                }, {
                    noAck: true,
                });
            }
            catch (ex) {
                reject(ex);
            }
        });
    }
    async replyAsync(replyTo, correlationId, reply) {
        const connection = await amqplib_1.default.connect(this.url);
        const channel = await connection.createChannel();
        channel.sendToQueue(replyTo, Buffer.from(JSON.stringify(reply)), {
            correlationId: correlationId,
        });
    }
}
const rabbitMQ_PubSub_Helper = new RabbitMQ_PubSub_Helper();
exports.rabbitMQ_PubSub_Helper = rabbitMQ_PubSub_Helper;
const rabbitMQ_RPC_Helper = new RabbitMQ_RPC_Helper();
exports.rabbitMQ_RPC_Helper = rabbitMQ_RPC_Helper;
