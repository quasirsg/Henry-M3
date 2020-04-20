
var gon = require('./prueba.js');
var fs = require('fs');


var archivo = fs.readFileSync('./prueba.js', 'utf-8');

console.log(archivo);

fs.readFile('./pruesadsadsaba.js', 'utf-8', function(err, data) {
  if(err) {
    return console.error(err);
  }
  console.log(data);
}); // callback

console.log('termine');
