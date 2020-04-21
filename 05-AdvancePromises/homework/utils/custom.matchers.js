// These are some custom assertions added to make Pledge specs
// simpler to read. Essentially they take in a user-created promise
// object, pass it success and error handlers, and check that the result
// matches expectations.
//
// Jasmine unfortunately doesn't support async matchers, so these functions
// "cheat" by accepting the `done` function as an extra parameter. They
// return a flag claiming the matcher passed, but then asynchronously pass or
// fail the entire spec using `done`.

var customMatchers = {

  toFulfillWith: function (util, customTesters) {
    return {
      compare: function (promise, expectedValue, done) {
        if (typeof done !== 'function') {
          throw Error('`toFulfillWith` must be passed `done` function.');
        }
        expect(true).toBe(true); // hack to supress missing expectations warning
        // check if promise fulfills with expected value, call `done` if so.
        promise
        .then(function (actualValue) {
          if (util.equals(actualValue, expectedValue, customTesters)) {
            done();
          } else {
            done.fail('Expected promise to fulfill with ' + jasmine.pp(expectedValue) + ' but fulfilled with ' + jasmine.pp(actualValue) + '.');
          }
        }, function (err) {
          done.fail('Expected promise to fulfill, but instead rejected with ' + jasmine.pp(err) + '.');
        });
        // necessary part of the matcher API.
        return { pass: true };
      },
      negativeCompare: function () {
        throw Error('`toFulfillWith` does not yet support negations.');
      }
    };
  },

  toRejectWith: function (util, customTesters) {
    return {
      compare: function (promise, expectedReason, done) {
        if (typeof done !== 'function') {
          throw Error('`toRejectWith` must be passed `done` function.');
        }
        expect(true).toBe(true); // hack to supress missing expectations warning
        // check if promise rejects with expected value, call `done` if so.
        promise
        .then(function (val) {
          done.fail('Expected promise to reject, but instead fulfilled with ' + jasmine.pp(val) + '.');
        }, function (actualReason) {
          if (util.equals(actualReason, expectedReason, customTesters)) {
            done();
          } else {
            done.fail('Expected promise to reject with ' + jasmine.pp(expectedReason) + ' but rejected with ' + jasmine.pp(actualReason) + '.');
          }
        });
        // necessary part of the matcher API.
        return { pass: true };
      },
      negativeCompare: function () {
        throw Error('`toRejectWith` does not yet support negations.');
      }
    };
  }

};
