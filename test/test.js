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
    beforeEach(function () {
        this.timer = new TimerStub()
    })

    it('should schedule periodic internal callbacks at specified rate', function () {
        start(this.timer, function () { }, new lib.Milliseconds(1000), new lib.Milliseconds(25))
        strictEqual(this.timer.periodicRate().milliseconds(), 25)
    });

    it('should call user supplied callback after specified time', function () {
        let called = false
        start(this.timer, function () { called = true }, new lib.Milliseconds(1000), new lib.Milliseconds(250))
        callback(this.timer) // 250 ms
        assertFalse(called)
        callback(this.timer) // 500 ms
        assertFalse(called)
        callback(this.timer) // 750 ms
        assertFalse(called)
        callback(this.timer) // 1000 ms
        assertTrue(called)
    });

    it('should call user supplied callback after specified time even if late', function () {
        let called = false
        start(this.timer, function () { called = true }, new lib.Milliseconds(1000), new lib.Milliseconds(300))
        callback(this.timer) // 300 ms
        assertFalse(called)
        callback(this.timer) // 600 ms
        assertFalse(called)
        callback(this.timer) // 900 ms
        assertFalse(called)
        callback(this.timer) // 1200 ms
        assertTrue(called)
    });
});
