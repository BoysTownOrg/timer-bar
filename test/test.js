import { strictEqual } from 'assert';
import * as lib from '../lib/lib.js'

class TimerStub {
    periodicRate() {
        return this.periodicRate_
    }

    schedulePeriodicCallback(callback, rate) {
        this.periodicRate_ = rate
    }
}

function start(timer, callback, time, rate) {
    lib.start(timer, callback, time, rate)
}

describe('start', function () {
    it('should schedule periodic callbacks at specified rate', function () {
        const timer = new TimerStub()
        start(timer, function () { }, new lib.Milliseconds(1000), new lib.Milliseconds(25))
        strictEqual(timer.periodicRate().milliseconds(), 25)
    });
});
