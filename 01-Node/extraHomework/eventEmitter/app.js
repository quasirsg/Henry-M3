// debes lograr que esto funcione!
// escribiendo código en emitter.js

var Emitter = require('./emitter.js');

var emtr =  new Emitter();

emtr.on('greet', function() {
	console.log('Alguien dijo Hola!');
});

emtr.on('greet', function() {
	console.log('Hubo saludos!');
});

console.log('Hello!');
emtr.emit('greet');