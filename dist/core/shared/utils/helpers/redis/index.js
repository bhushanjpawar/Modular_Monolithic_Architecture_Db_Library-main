"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const env_1 = require("../../../../config/env");
class RedisHelper {
    constructor() {
        this.init();
    }
    async init() {
        const url = `redis://${env_1.REDIS_USERNAME}:${env_1.REDIS_PASSWORD}@${env_1.REDIS_HOST}:${env_1.REDIS_PORT}`;
        this.client = (0, redis_1.createClient)({
            //url: 'redis://alice:foobared@awesome.redis.server:6380', // replace with your Redis server URL
            url: url,
            database: parseInt(env_1.REDIS_DB),
        });
        this.client.on('error', (err) => console.log('Redis Client Error', err));
        await this.client.connect();
    }
    async get(key) {
        return await this.client.get(key);
    }
    async set(key, value) {
        await this.client.set(key, value);
    }
    async disconnect() {
        await this.client.disconnect();
    }
}
exports.default = new RedisHelper();
