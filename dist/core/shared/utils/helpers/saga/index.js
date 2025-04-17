"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SagaBuilder = exports.ActivityResult = exports.SagaActivity = exports.CompensationActivityModel = exports.SagaResult = void 0;
class SagaResult {
    constructor(isSuccess, results) {
        this.isSuccess = isSuccess;
        this.results = results;
    }
    get IsSuccess() {
        return this.isSuccess;
    }
    set IsSuccess(value) {
        this.isSuccess = value;
    }
    get Results() {
        return this.results;
    }
}
exports.SagaResult = SagaResult;
class CompensationActivityModel {
    constructor(compensationName, action) {
        this.compensationName = compensationName;
        this.action = action;
    }
}
exports.CompensationActivityModel = CompensationActivityModel;
class SagaActivity {
    constructor(action, activityName) {
        this.action = action;
        this.activityName = activityName;
        this.compensations = [];
    }
    get Action() {
        return async () => {
            const result = await this.action();
            return new SagaResult(result.isSuccess, result.results);
        };
    }
    get Compensations() {
        return this.compensations.map((c) => async (r) => {
            await c(new SagaResult(r.isSuccess, r.results));
        });
    }
}
exports.SagaActivity = SagaActivity;
class ActivityResult {
    constructor(activityName, sagaResult) {
        this.activityName = activityName;
        this.sagaResult = sagaResult;
    }
}
exports.ActivityResult = ActivityResult;
class SagaBuilder {
    constructor(sagaName) {
        this.sagaName = sagaName;
        this.activities = [];
        this.activityResults = [];
    }
    activity(activityName, action) {
        this.activities.push(new SagaActivity(action, activityName));
        return this;
    }
    compensationActivity(activityName, compensationName, compensation) {
        const activity = this.activities.find((e) => e.activityName === activityName);
        if (activity) {
            activity.compensations.push(compensation);
        }
        return this;
    }
    async executeAsync() {
        for (const activity of this.activities) {
            try {
                const result = await activity.action();
                if (result) {
                    this.activityResults.push(new ActivityResult(activity.activityName || '', result));
                }
                if (activity.compensations.length > 0) {
                    for (const compensation of activity.compensations) {
                        await compensation(result);
                    }
                }
            }
            catch (ex) {
                const error = ex;
                console.error(`Activity ${activity.activityName} failed with error: ${error.message}`);
                throw ex;
            }
        }
    }
}
exports.SagaBuilder = SagaBuilder;
