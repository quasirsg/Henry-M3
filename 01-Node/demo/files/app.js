var fs = require('fs');


// var saludo = fs.readFileSync(__dirname + '/greet.txt', 'utf8');
// console.log(saludo);

// var saludo = fs.readFileSync(__dirname + '/greet.txt');
// console.log('sin encoding:' + saludo); //sin encoding

fs.readFile(__dirname + '/greet.txt', 'utf8', function(err, data) {
  if(err) return console.log(err);
	console.log('data');
});

console.log('Listo!');