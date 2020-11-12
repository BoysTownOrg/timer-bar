import { strictEqual } from 'assert';
import * as lib from '../lib/lib.js'

class TimerStub {
    periodicRate() {
        return this.periodicRate_
    }

    schedulePeriodicCallback(callback, rate) {
        this.periodicRate_ = rate
        this.callback_ = callback
    }

    callback() { this.callback_() }
}

function callback(timer) { timer.callback() }

function start(timer, callback, time, rate) {
    lib.start(timer, callback, time, rate)
}

function assertFalse(b) {
    strictEqual(b, false)
}

function assertTrue(b) {
    strictEqual(b, true)
}

describe('start', function () {
    it('should schedule periodic internal callbacks at specified rate', function () {
        const timer = new TimerStub()
        start(timer, function () { }, new lib.Milliseconds(1000), new lib.Milliseconds(25))
        strictEqual(timer.periodicRate().milliseconds(), 25)
    });

    it('should call user supplied callback after specified time', function () {
        const timer = new TimerStub()
        let called = false
        start(timer, function () { called = true }, new lib.Milliseconds(1000), new lib.Milliseconds(250))
        callback(timer) // 250 ms
        assertFalse(called)
        callback(timer) // 500 ms
        assertFalse(called)
        callback(timer) // 750 ms
        assertFalse(called)
        callback(timer) // 1000 ms
        assertTrue(called)
    });
});
