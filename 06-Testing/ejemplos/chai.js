var chai = require('chai');
describe('Array', function() {
  before(function() {
    console.log('Hola, probando hook');
  });
  afterEach(function() {
    console.log('Cuantas veces aparezco!');
  });
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      if(false){
        console.log('esto nunca se ejecutara! jajaja!');
      }else{
        chai.assert.equal(-1, [1,2,3].indexOf(4));
      }
    });
  });
  describe('#slice()', function() {
    it('should return [2,3] when args are (1,3)', function() {
      chai.assert.deepEqual([2,3], [1,2,3].slice(1,3));
    });
  });
});