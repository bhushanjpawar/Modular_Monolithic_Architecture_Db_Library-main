declare class RedisHelper {
    private client;
    constructor();
    init(): Promise<void>;
    get(key: string): Promise<string | null>;
    set(key: string, value: string): Promise<void>;
    disconnect(): Promise<void>;
}
declare const _default: RedisHelper;
export default _default;
//# sourceMappingURL=index.d.ts.map