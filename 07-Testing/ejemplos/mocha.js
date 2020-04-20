var assert = require('assert');

function multiply(n) {
	return n*2;
}

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
    describe('#slice()', function() {
    it('should return [2,3] when args are (1,3)', function() {
      assert.equal([2,3], [1,2,3].slice(1,3));
    });
  });
  describe('#slice() con deepEqual', function() {
    it('should return [2,3] when args are (1,3)', function() {
      assert.deepEqual([2,3], [1,2,3].slice(1,3));
    });
  });
  describe('Test de Multiply', function() {
    it('should return 4 when arg is 2', function() {
      assert.equal(4, multiply(2));
    });
    it('should return 8 when arg is 4', function() {
      assert.equal(8, multiply(4));
    });
  });
});
