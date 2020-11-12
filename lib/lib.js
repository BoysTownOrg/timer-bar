export function start(timer, callback, time, rate) {
    timer.schedulePeriodicCallback(null, rate)
}

export class Milliseconds {
    constructor(t) {
        this.t = t
    }

    milliseconds() { return this.t }
}