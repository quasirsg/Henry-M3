var { expect } = require('chai');
var sumArray = require('./index.js');

describe('SumArray', function() {
  before(function() {
    console.log('Hola, probando hook');
  });
  afterEach(function() {
    console.log('Cuantas veces aparezco!');
  });
  it('should be a function', function() {
    expect(sumArray).to.be.a('function');
  });
  it('should throw an error if first argument is not an array', function() {
    expect(() => sumArray('sadasd')).to.throw(TypeError, /array/);
  });
  it('should throw an error if second argument is not an number', function() {
    expect(() => sumArray([], 'string')).to.throw(TypeError, /array/);
  });
  it('return true when invoked with [1,2,3] and 5', function() {
    expect(sumArray([1,2,3], 5)).to.be.true;
  });
  it('return false when invoked with [1,2,3] and 7', function() {
    expect(sumArray([1,2,3], 7)).to.be.false;
  });
  
});