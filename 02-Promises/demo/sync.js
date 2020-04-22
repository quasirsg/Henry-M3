const fs = require('fs');

console.log('antes de leer');

fs.readFile('./archivo.txt', 'utf8', function(err, data) { 
  if (err) throw err;
  //console.log(data);    
  console.log('termine de leer');
}); 


// const data = fs.readFileSync('./archivo.txt', 'utf8');
// console.log(data);

