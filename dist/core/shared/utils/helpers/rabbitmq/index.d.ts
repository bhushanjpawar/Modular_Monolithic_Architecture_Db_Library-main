declare class RabbitMQ_PubSub_Helper {
    private readonly url;
    constructor();
    sendAsync<T>(queue: string, message: T): Promise<void>;
    receiveAsync<T>(queue: string): Promise<T>;
}
declare class RabbitMQ_RPC_Helper {
    private readonly url;
    constructor();
    requestAsync<TRequest, TResponse>(queue: string, message: TRequest): Promise<TResponse>;
    receiveAsync<TRequest>(queue: string): Promise<{
        request: TRequest;
        replyTo: string;
        correlationId: string;
    }>;
    replyAsync<TReply>(replyTo: string, correlationId: string, reply: TReply): Promise<void>;
}
declare const rabbitMQ_PubSub_Helper: RabbitMQ_PubSub_Helper;
declare const rabbitMQ_RPC_Helper: RabbitMQ_RPC_Helper;
export { rabbitMQ_PubSub_Helper, rabbitMQ_RPC_Helper };
//# sourceMappingURL=index.d.ts.map