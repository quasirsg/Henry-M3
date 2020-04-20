var util = require('util');

function getRandomInt(min, max) {  
  return Math.floor(Math.random() * (max - min)) + min;
}

function numberGenerator(min, max){

	var ReadableStream = require('stream').Readable;  // Datos pueden ser LEIDOS de este stream.

	ReadableStream.prototype._min = min;
	ReadableStream.prototype._max = max;
	ReadableStream.prototype._index = 1;
		
	ReadableStream.prototype._read = function() {  
	  var i = this._index++;
	  this.push(String(getRandomInt(this._min, this._max + 1) ));
	};

	return ReadableStream();
}

function runningAverage(){
	var Transform = require('stream').Transform;  
	Transform.prototype.average = 0;
	Transform.prototype.count = 0;
	Transform.prototype._transform = function(chunk, encoding, callback) {
		this.count++;
		var number = Number(chunk.toString());
		this.average = this.average + (number - this.average) / this.count;
	  	this.push( String(this.average)+'\n' )
	  	callback();
	};
	return Transform();
}

var generator = numberGenerator(1,450);
var average = runningAverage();


// Unpipe after 10 seconds


var pipeline = generator.pipe(average);
pipeline.pipe(process.stdout);