export function start(timer, callback, time, rate) {
    let currentTimeMilliseconds = 0
    timer.schedulePeriodicCallback(function () {
        currentTimeMilliseconds += rate.milliseconds()
        if (currentTimeMilliseconds >= time.milliseconds()) {
            timer.ceasePeriodicCallbacks()
            callback()
        }
    }, rate)
}

export class Milliseconds {
    constructor(t) {
        this.t = t
    }

    milliseconds() { return this.t }
}