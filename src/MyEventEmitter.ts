export default class MyEventEmitter {
    eventMap: any;
    constructor() {
        this.eventMap = {};
    }
    on(type: string, handler: (args?: any) => void) {
        if (!(handler instanceof Function)) {
            throw new Error('handler 必须是函数');
        }
        if (!this.eventMap[type]) {
            this.eventMap[type] = [];
        }
        this.eventMap[type].push(handler);
    }
    emit(type: string, params: Object) {
        if (this.eventMap[type]) {
            this.eventMap[type].forEach((handler: (arg0: Object) => void) => {
                handler(params);
            });
        }
    }
    off(type: string, handler: (args?: any) => void) {
        if (this.eventMap[type]) {
            this.eventMap[type].splice(this.eventMap[type].indexOf(handler) >>> 0, 1);
        }
    }
}
