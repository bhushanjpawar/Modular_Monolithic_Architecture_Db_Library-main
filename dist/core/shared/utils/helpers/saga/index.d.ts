export declare class SagaResult<T> {
    isSuccess: boolean;
    results: T;
    constructor(isSuccess: boolean, results: T);
    get IsSuccess(): boolean;
    set IsSuccess(value: boolean);
    get Results(): T;
}
export declare class CompensationActivityModel<T> {
    compensationName: string;
    action: (arg: SagaResult<T>) => Promise<void>;
    constructor(compensationName: string, action: (arg: SagaResult<T>) => Promise<void>);
}
interface ISagaActivity<T> {
    activityName?: string;
    action: () => Promise<SagaResult<T>>;
    compensations: Array<(arg: SagaResult<T>) => Promise<void>>;
}
export declare class SagaActivity<T> implements ISagaActivity<T> {
    action: () => Promise<SagaResult<T>>;
    activityName?: string | undefined;
    compensations: Array<(arg: SagaResult<T>) => Promise<void>>;
    constructor(action: () => Promise<SagaResult<T>>, activityName?: string | undefined);
    get Action(): () => Promise<SagaResult<T>>;
    get Compensations(): Array<(arg: SagaResult<T>) => Promise<void>>;
}
export declare class ActivityResult<T> {
    activityName: string;
    sagaResult: SagaResult<T>;
    constructor(activityName: string, sagaResult: SagaResult<T>);
}
export declare class SagaBuilder<TSagaResult> {
    sagaName?: string | undefined;
    private activities;
    activityResults: ActivityResult<TSagaResult>[];
    constructor(sagaName?: string | undefined);
    activity(activityName: string, action: () => Promise<SagaResult<TSagaResult>>): SagaBuilder<TSagaResult>;
    compensationActivity(activityName: string, compensationName: string, compensation: (arg: SagaResult<TSagaResult>) => Promise<void>): SagaBuilder<TSagaResult>;
    executeAsync(): Promise<void>;
}
export {};
//# sourceMappingURL=index.d.ts.map