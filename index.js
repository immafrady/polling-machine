class PollingMachine {
    static DEFAULT_TIME_GAP = 5000;
    static EVENT = {
        MSG: 'message',
        ERR: 'error'
    };

    /**
     * Constructor of PollingMachine
     * @param promiseMethod - A request method, must be an instance of Promise
     * @param params - The argument which is passing into the promiseMethod
     */
    constructor(promiseMethod, ...params) {
        this.method = promiseMethod;
        this.params = params;
        this.events = new Map();
        this.events.set(PollingMachine.EVENT.MSG, null);
        this.events.set(PollingMachine.EVENT.MSG, null);
        this.timer = null;
        this.gap = 0;
    }

    /**
     * Start to poll
     * @param time - Gap between each request
     */
    start(time = PollingMachine.DEFAULT_TIME_GAP) {
        this.gap = time;
        if (!this.timer) {
            this.timer = setInterval(() => {
                Promise
                    .resolve(this.method(...this.params))
                    .then(res => {
                        const success = this.events.get(PollingMachine.EVENT.MSG);
                        if (success && typeof success === 'function') {
                            success(res)
                        }
                    })
                    .catch(err => {
                        const fail = this.events.get(PollingMachine.EVENT.ERR);
                        if (fail && typeof fail === 'function') {
                            fail(err)
                        }
                    });
            }, this.gap)
        } else {
            this.stop();
            this.start(this.gap);
        }
    }

    /**
     * Stop Polling
     */
    stop() {
        clearInterval(this.timer);
        this.timer = null
    }

    /**
     * Add Event Listener
     * @param method - Method to be called
     */
    onmessage(method) {
        if (typeof method === 'function') {
            this.events.set(PollingMachine.EVENT.MSG, method);
        } else {
            throw new Error('Missing Argument: type must be "function"');
        }
    }

    onerror(method) {
        if (typeof method === 'function') {
            this.events.set(PollingMachine.EVENT.ERR, method);
        } else {
            throw new Error('Missing Argument: type must be "function"');
        }
    }
}
